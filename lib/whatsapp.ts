/**
 * WhatsApp Adapter for Nakshatra Hotel & Resort
 * Dispatches all template and text messages via the shikhabajaj.online Meta Cloud API Gateway.
 */

export interface SendTemplateOptions {
  to: string;
  templateName: string;
  languageCode?: string;
  bodyParams: string[];
  buttonUrlParam?: string;
}

export interface SendTemplateResult {
  ok: boolean;
  messageId?: string;
  whatsappMessageId?: string;
  error?: string;
}

function maskPhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length <= 4) return "****";
  return clean.slice(0, 2) + "****" + clean.slice(-4);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendTemplate(options: SendTemplateOptions): Promise<SendTemplateResult> {
  const { to, templateName, languageCode = "en_US", bodyParams, buttonUrlParam } = options;

  const baseUrl = process.env.WHATSAPP_API_BASE_URL || "https://www.shikhabajaj.online/api/v1";
  const apiKey = process.env.WHATSAPP_API_KEY;

  if (!apiKey) {
    console.error("[whatsapp] WHATSAPP_API_KEY is not configured.");
    return { ok: false, error: "WHATSAPP_API_KEY is not configured" };
  }

  // Sanitize bodyParams: no newlines, tabs, collapse consecutive spaces, trim, cap details
  const sanitizedParams = bodyParams.map((p, idx) => {
    if (!p || typeof p !== "string") return "Not provided";
    let cleaned = p.replace(/[\r\n\t]+/g, " ").replace(/\s{4,}/g, " ").trim();
    if (idx === 3 && cleaned.length > 200) {
      cleaned = cleaned.slice(0, 197) + "...";
    }
    return cleaned || "Not provided";
  });

  // Normalize phone number to E.164 (+91...)
  let formattedTo = to.trim();
  if (!formattedTo.startsWith("+")) {
    const digitsOnly = formattedTo.replace(/\D/g, "");
    if (digitsOnly.length === 10) {
      formattedTo = `+91${digitsOnly}`;
    } else {
      formattedTo = `+${digitsOnly}`;
    }
  }

  let templatePayload: {
    name: string;
    language: string;
    params: string[] | { body: string[]; buttons?: Array<{ type: string; parameter: string }> };
  } = {
    name: templateName,
    language: languageCode,
    params: sanitizedParams,
  };

  if (buttonUrlParam) {
    templatePayload.params = {
      body: sanitizedParams,
      buttons: [
        {
          type: "url",
          parameter: buttonUrlParam.replace(/\D/g, ""),
        },
      ],
    };
  }

  const endpoint = `${baseUrl.replace(/\/$/, "")}/messages`;
  const requestBody = {
    to: formattedTo,
    type: "template",
    template: templatePayload,
  };

  const maxAttempts = 3;
  let lastError = "";

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const resData = await res.json().catch(() => null);

      if (res.ok && resData?.data) {
        return {
          ok: true,
          messageId: resData.data.message_id,
          whatsappMessageId: resData.data.whatsapp_message_id,
        };
      }

      // 4xx errors should not be retried (bad request, invalid number, etc.)
      if (res.status >= 400 && res.status < 500) {
        const errorMsg = resData?.error?.message || resData?.message || `HTTP ${res.status}`;
        console.error(`[whatsapp] Permanent 4xx error sending to ${maskPhone(formattedTo)}: ${errorMsg}`);
        return { ok: false, error: errorMsg };
      }

      // 5xx or server failure: log and retry
      lastError = resData?.error?.message || `HTTP ${res.status}`;
      console.warn(`[whatsapp] Attempt ${attempt} failed with 5xx to ${maskPhone(formattedTo)}: ${lastError}`);
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(`[whatsapp] Attempt ${attempt} network error to ${maskPhone(formattedTo)}: ${lastError}`);
    }

    if (attempt < maxAttempts) {
      await sleep(1000 * Math.pow(2, attempt - 1)); // Backoff: 1s, 2s
    }
  }

  return { ok: false, error: lastError || "Failed after 3 attempts" };
}
