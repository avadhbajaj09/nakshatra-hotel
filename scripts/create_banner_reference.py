from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "banner-assets"
IMAGES = ROOT / "public" / "images"

WIDTH, HEIGHT = 6000, 1500
GREEN = (4, 42, 33)
GREEN_DARK = (2, 25, 20)
GOLD = (218, 171, 80)
GOLD_LIGHT = (255, 224, 150)
CREAM = (250, 241, 217)


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


BODONI = "/System/Library/Fonts/Supplemental/Bodoni 72 Smallcaps Book.ttf"
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"


def cover(image: Image.Image, size: tuple[int, int], focus_y: float = 0.5) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )
    left = max(0, (resized.width - target_w) // 2)
    top = max(0, round((resized.height - target_h) * focus_y))
    return resized.crop((left, top, left + target_w, top + target_h))


def fit(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    scale = min(size[0] / image.width, size[1] / image.height)
    return image.resize(
        (round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS
    )


def tracked_width(draw: ImageDraw.ImageDraw, text: str, face, spacing: int) -> int:
    widths = [draw.textlength(char, font=face) for char in text]
    return round(sum(widths) + spacing * max(0, len(text) - 1))


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
    if anchor in {"mt", "mm", "mb"}:
        x -= total // 2
    elif anchor in {"rt", "rm", "rb"}:
        x -= total
    for char in text:
        draw.text((x, y), char, font=face, fill=fill, anchor="lt")
        x += draw.textlength(char, font=face) + spacing


def gold_gradient(size: tuple[int, int]) -> Image.Image:
    w, h = size
    result = Image.new("RGBA", size)
    px = result.load()
    stops = [
        (0.00, (150, 96, 25)),
        (0.28, (242, 202, 116)),
        (0.50, (255, 235, 174)),
        (0.72, (205, 145, 52)),
        (1.00, (255, 219, 132)),
    ]
    for y in range(h):
        t = y / max(1, h - 1)
        for idx in range(len(stops) - 1):
            a_t, a = stops[idx]
            b_t, b = stops[idx + 1]
            if a_t <= t <= b_t:
                local = (t - a_t) / (b_t - a_t)
                color = tuple(round(a[c] + (b[c] - a[c]) * local) for c in range(3))
                break
        else:
            color = stops[-1][1]
        for x in range(w):
            px[x, y] = (*color, 255)
    return result


def rounded_panel(image: Image.Image, size: tuple[int, int], radius: int) -> Image.Image:
    panel = cover(image.convert("RGB"), size)
    panel = ImageEnhance.Contrast(panel).enhance(1.04)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    result = Image.new("RGBA", size)
    result.paste(panel.convert("RGBA"), (0, 0), mask)
    return result


canvas = Image.new("RGB", (WIDTH, HEIGHT), GREEN_DARK)

# Pool hero on the right.
split_x = 2100
hero = Image.open(ASSETS / "nakshatra-pool-hero-ai-v1.png").convert("RGB")
hero = cover(hero, (WIDTH - split_x, HEIGHT), focus_y=0.47)
hero = ImageEnhance.Contrast(hero).enhance(1.04)
hero = ImageEnhance.Color(hero).enhance(0.96)
canvas.paste(hero, (split_x, 0))

# Dark cinematic wash and a green blend toward the brand panel.
wash = Image.new("RGBA", (WIDTH - split_x, HEIGHT), (0, 0, 0, 0))
wash_px = wash.load()
for x in range(wash.width):
    left_alpha = max(0, round(225 * (1 - x / 1050))) if x < 1050 else 0
    for y in range(wash.height):
        bottom_alpha = round(85 * max(0, (y / wash.height - 0.58) / 0.42))
        alpha = min(235, max(left_alpha, bottom_alpha))
        wash_px[x, y] = (2, 28, 21, alpha)
canvas = Image.alpha_composite(canvas.convert("RGBA"), Image.new("RGBA", canvas.size))
canvas.alpha_composite(wash, (split_x, 0))

# Brand panel with subtle diagonal texture.
panel = Image.new("RGBA", (split_x + 220, HEIGHT), (*GREEN, 255))
panel_draw = ImageDraw.Draw(panel, "RGBA")
for x in range(-HEIGHT, split_x + 500, 135):
    panel_draw.line((x, HEIGHT, x + HEIGHT, 0), fill=(255, 255, 255, 7), width=3)
for x in range(-HEIGHT, split_x + 500, 270):
    panel_draw.line((x, HEIGHT, x + HEIGHT, 0), fill=(*GOLD, 8), width=2)

# Feather right edge of the green panel.
panel_mask = Image.new("L", panel.size, 255)
mask_px = panel_mask.load()
for x in range(split_x - 80, panel.width):
    alpha = max(0, round(255 * (panel.width - x) / 300))
    for y in range(panel.height):
        mask_px[x, y] = alpha
canvas.paste(panel, (0, 0), panel_mask)

draw = ImageDraw.Draw(canvas, "RGBA")

# Outer gold frame and restrained ornamental corners.
draw.rounded_rectangle((24, 24, WIDTH - 25, HEIGHT - 25), radius=18, outline=GOLD, width=8)
draw.rounded_rectangle((43, 43, WIDTH - 44, HEIGHT - 44), radius=14, outline=(255, 221, 145, 145), width=2)
for left in (85, WIDTH - 415):
    draw.line((left, 100, left + 250, 100), fill=GOLD, width=5)
    draw.line((left, 100, left, 260), fill=GOLD, width=5)
for left in (85, WIDTH - 415):
    draw.line((left, HEIGHT - 100, left + 250, HEIGHT - 100), fill=GOLD, width=5)
    draw.line((left, HEIGHT - 260, left, HEIGHT - 100), fill=GOLD, width=5)

# Welcome line.
welcome_font = font(BODONI, 102)
tracked_text(draw, (1035, 125), "WELCOME TO", welcome_font, GOLD_LIGHT, 18, anchor="mt")
draw.line((470, 275, 1600, 275), fill=(220, 173, 79, 210), width=4)
draw.ellipse((1018, 265, 1032, 279), fill=GOLD_LIGHT)

# Genuine logo, placed without redrawing or alteration.
logo = Image.open(IMAGES / "nakshatra-logo-gold-transparent-v2.png").convert("RGBA")
logo = fit(logo, (1720, 860))
logo_y = 340
logo_x = (2070 - logo.width) // 2
shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
shadow_alpha = logo.getchannel("A").filter(ImageFilter.GaussianBlur(15))
shadow_layer = Image.new("RGBA", logo.size, (0, 0, 0, 150))
shadow_layer.putalpha(shadow_alpha)
shadow.alpha_composite(shadow_layer, (logo_x + 10, logo_y + 16))
canvas = Image.alpha_composite(canvas, shadow)
canvas.alpha_composite(logo, (logo_x, logo_y))
draw = ImageDraw.Draw(canvas, "RGBA")

# Amenity statement on the brand panel.
tag_font = font(AVENIR, 42, index=0)
tracked_text(
    draw,
    (1035, 1255),
    "STAY  •  DINE  •  CELEBRATE",
    tag_font,
    CREAM,
    5,
    anchor="mt",
)

# Three amenity cards over the bottom of the pool scene.
triptych = Image.open(ASSETS / "nakshatra-amenities-triptych-ai-v1.png").convert("RGB")
third = triptych.width // 3
source_panels = [
    triptych.crop((0, 0, third, triptych.height)),
    triptych.crop((third, 0, third * 2, triptych.height)),
    triptych.crop((third * 2, 0, triptych.width, triptych.height)),
]
labels = ["LUXURY ROOMS", "FINE DINING", "BANQUET & EVENTS"]
card_w, card_h = 1040, 350
gap = 62
cards_x = split_x + 270
cards_y = HEIGHT - card_h - 105
label_font = font(AVENIR, 40, index=1)

for idx, source in enumerate(source_panels):
    x = cards_x + idx * (card_w + gap)
    # Border and soft shadow.
    draw.rounded_rectangle(
        (x - 9, cards_y - 9, x + card_w + 9, cards_y + card_h + 9),
        radius=30,
        fill=(0, 0, 0, 90),
        outline=GOLD,
        width=7,
    )
    card = rounded_panel(source, (card_w, card_h), 23)
    canvas.alpha_composite(card, (x, cards_y))
    # Label veil.
    veil = Image.new("RGBA", (card_w, 92), (2, 28, 21, 205))
    canvas.alpha_composite(veil, (x, cards_y + card_h - 92))
    draw = ImageDraw.Draw(canvas, "RGBA")
    tracked_text(
        draw,
        (x + card_w // 2, cards_y + card_h - 76),
        labels[idx],
        label_font,
        GOLD_LIGHT,
        4,
        anchor="mt",
    )

# Small honest descriptor; no contact details invented.
descriptor_font = font(AVENIR, 34, index=0)
tracked_text(
    draw,
    (4020, 108),
    "A WARM WELCOME AWAITS",
    descriptor_font,
    (255, 247, 224, 230),
    8,
    anchor="mt",
)

output_png = ASSETS / "nakshatra-welcome-banner-reference-40x10.png"
output_jpg = ASSETS / "nakshatra-welcome-banner-reference-40x10.jpg"
canvas_rgb = canvas.convert("RGB")
canvas_rgb.save(output_png, optimize=True)
canvas_rgb.save(output_jpg, quality=94, subsampling=0, optimize=True)
print(output_png)
print(output_jpg)
