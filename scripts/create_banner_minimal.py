from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "banner-assets"
IMAGES = ROOT / "public" / "images"

WIDTH, HEIGHT = 6000, 1500
IVORY = (248, 245, 236)
IVORY_WARM = (243, 237, 222)
SAGE = (74, 100, 82)
GREEN = (26, 72, 59)
GOLD = (185, 141, 65)
GOLD_LIGHT = (230, 196, 126)

BODONI = "/System/Library/Fonts/Supplemental/Bodoni 72 Smallcaps Book.ttf"
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


def cover(image: Image.Image, size: tuple[int, int], focus_x: float = 0.5) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )
    extra_x = max(0, resized.width - target_w)
    left = round(extra_x * focus_x)
    top = max(0, (resized.height - target_h) // 2)
    return resized.crop((left, top, left + target_w, top + target_h))


def fit(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    scale = min(size[0] / image.width, size[1] / image.height)
    return image.resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )


def tracked_width(draw: ImageDraw.ImageDraw, text: str, face, spacing: int) -> int:
    return round(
        sum(draw.textlength(char, font=face) for char in text)
        + spacing * max(0, len(text) - 1)
    )


def tracked_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    face,
    fill,
    spacing: int,
    anchor: str = "lt",
) -> None:
    x, y = xy
    total = tracked_width(draw, text, face, spacing)
    if anchor.startswith("m"):
        x -= total // 2
    elif anchor.startswith("r"):
        x -= total
    for char in text:
        draw.text((x, y), char, font=face, fill=fill, anchor="lt")
        x += draw.textlength(char, font=face) + spacing


# Soft ivory background with an almost invisible warm vertical gradient.
canvas = Image.new("RGBA", (WIDTH, HEIGHT), (*IVORY, 255))
background = Image.new("RGBA", (WIDTH, HEIGHT))
bg_px = background.load()
for y in range(HEIGHT):
    t = y / max(1, HEIGHT - 1)
    color = tuple(round(IVORY[c] + (IVORY_WARM[c] - IVORY[c]) * t) for c in range(3))
    for x in range(WIDTH):
        bg_px[x, y] = (*color, 255)
canvas = background

# One hero photograph, covering approximately half of the banner.
photo_x = 2840
photo = Image.open(ASSETS / "nakshatra-poolside-wedding-ai-v1.png").convert("RGB")
photo = cover(photo, (WIDTH - photo_x, HEIGHT), focus_x=0.6)
photo = ImageEnhance.Color(photo).enhance(0.94)
photo = ImageEnhance.Contrast(photo).enhance(0.98)
canvas.paste(photo.convert("RGBA"), (photo_x, 0))

# Smooth ivory-to-photo transition so the design feels airy rather than divided.
transition_w = 650
transition = Image.new("RGBA", (transition_w, HEIGHT), (0, 0, 0, 0))
transition_px = transition.load()
for x in range(transition_w):
    t = x / max(1, transition_w - 1)
    alpha = round(255 * (1 - t) ** 1.7)
    for y in range(HEIGHT):
        warmth = round(IVORY[c] + (IVORY_WARM[c] - IVORY[c]) * (y / HEIGHT)) if False else 0
        transition_px[x, y] = (*IVORY, alpha)
canvas.alpha_composite(transition, (photo_x, 0))

# A very subtle aqua reflection along the bottom supports the refreshing mood.
water_glow = Image.new("RGBA", (3600, 240), (0, 0, 0, 0))
glow_px = water_glow.load()
for y in range(water_glow.height):
    alpha = round(34 * (y / water_glow.height))
    for x in range(water_glow.width):
        glow_px[x, y] = (112, 201, 199, alpha)
water_glow = water_glow.filter(ImageFilter.GaussianBlur(25))
canvas.alpha_composite(water_glow, (0, HEIGHT - 240))

draw = ImageDraw.Draw(canvas, "RGBA")

# Fine champagne-gold frame.
draw.rounded_rectangle((24, 24, WIDTH - 25, HEIGHT - 25), radius=14, outline=GOLD, width=6)
draw.rounded_rectangle(
    (40, 40, WIDTH - 41, HEIGHT - 41),
    radius=11,
    outline=(230, 196, 126, 120),
    width=2,
)

# Welcome heading and light ornament.
welcome_font = font(BODONI, 94)
tracked_text(draw, (1430, 112), "WELCOME TO", welcome_font, GREEN, 16, anchor="mt")
draw.line((710, 245, 1320, 245), fill=(185, 141, 65, 180), width=3)
draw.line((1540, 245, 2150, 245), fill=(185, 141, 65, 180), width=3)
draw.ellipse((1421, 237, 1439, 255), fill=GOLD)

# Genuine logo, used as supplied without regeneration.
logo = Image.open(IMAGES / "nakshatra-logo-gold-transparent-v2.png").convert("RGBA")
logo = fit(logo, (1760, 825))
logo_x = 1430 - logo.width // 2
logo_y = 300

shadow_alpha = logo.getchannel("A").filter(ImageFilter.GaussianBlur(11))
shadow = Image.new("RGBA", logo.size, (80, 60, 22, 55))
shadow.putalpha(shadow_alpha.point(lambda p: round(p * 0.22)))
canvas.alpha_composite(shadow, (logo_x + 5, logo_y + 11))
canvas.alpha_composite(logo, (logo_x, logo_y))

draw = ImageDraw.Draw(canvas, "RGBA")

# Emotional promise and concise amenity line.
promise_font = font(AVENIR, 58, index=1)
tracked_text(
    draw,
    (1430, 1162),
    "STAY  •  CELEBRATE  •  UNWIND",
    promise_font,
    GREEN,
    4,
    anchor="mt",
)

amenity_font = font(AVENIR, 39, index=0)
tracked_text(
    draw,
    (1430, 1286),
    "LUXURY ROOMS   •   SWIMMING POOL   •   FINE DINING   •   WEDDINGS & EVENTS",
    amenity_font,
    SAGE,
    1,
    anchor="mt",
)

# Small photo-side caption, intentionally quiet.
caption_font = font(AVENIR, 34, index=1)
tracked_text(
    draw,
    (4470, 1328),
    "YOUR BEAUTIFUL MOMENTS BEGIN HERE",
    caption_font,
    (255, 255, 255, 242),
    5,
    anchor="mt",
)

output_png = ASSETS / "nakshatra-welcome-banner-minimal-40x10-v2.png"
output_jpg = ASSETS / "nakshatra-welcome-banner-minimal-40x10-v2.jpg"
canvas_rgb = canvas.convert("RGB")
canvas_rgb.save(output_png, optimize=True)
canvas_rgb.save(output_jpg, quality=95, subsampling=0, optimize=True)
print(output_png)
print(output_jpg)
