from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "banner-assets"
IMAGES = ROOT / "public" / "images"

WIDTH, HEIGHT = 6000, 1500
GREEN = (24, 70, 57)
GOLD = (181, 135, 57)
SAGE = (62, 91, 75)

BODONI = "/System/Library/Fonts/Supplemental/Bodoni 72 Smallcaps Book.ttf"
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


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


# A single continuous full-width photograph. No fade, tint panel, vignette, or shading.
photo = Image.open(ASSETS / "nakshatra-full-panorama-wedding-pool-ai-v2.png").convert("RGB")
canvas = cover(photo, (WIDTH, HEIGHT), focus_y=0.44)
canvas = ImageEnhance.Color(canvas).enhance(0.96).convert("RGBA")
draw = ImageDraw.Draw(canvas, "RGBA")

# Simple fine border only.
draw.rounded_rectangle((24, 24, WIDTH - 25, HEIGHT - 25), radius=14, outline=GOLD, width=6)
draw.rounded_rectangle((40, 40, WIDTH - 41, HEIGHT - 41), radius=11, outline=(230, 196, 126, 130), width=2)

# Welcome heading.
welcome_font = font(BODONI, 90)
tracked_text(draw, (1375, 92), "WELCOME TO", welcome_font, GREEN, 16, anchor="mt")
draw.line((690, 221, 1260, 221), fill=(181, 135, 57, 190), width=3)
draw.line((1490, 221, 2060, 221), fill=(181, 135, 57, 190), width=3)
draw.ellipse((1366, 213, 1384, 231), fill=GOLD)

# Genuine logo pasted directly, without any drop shadow or background shading.
logo = Image.open(IMAGES / "nakshatra-logo-gold-transparent-v2.png").convert("RGBA")
logo = fit(logo, (1760, 825))
canvas.alpha_composite(logo, (1375 - logo.width // 2, 278))
draw = ImageDraw.Draw(canvas, "RGBA")

promise_font = font(AVENIR, 57, index=1)
tracked_text(
    draw,
    (1375, 1142),
    "STAY  •  CELEBRATE  •  UNWIND",
    promise_font,
    GREEN,
    4,
    anchor="mt",
)

amenity_font = font(AVENIR, 38, index=0)
tracked_text(
    draw,
    (1375, 1275),
    "LUXURY ROOMS   •   SWIMMING POOL   •   FINE DINING   •   WEDDINGS & EVENTS",
    amenity_font,
    SAGE,
    1,
    anchor="mt",
)

output_png = ASSETS / "nakshatra-welcome-banner-full-photo-40x10-v3.png"
output_jpg = ASSETS / "nakshatra-welcome-banner-full-photo-40x10-v3.jpg"
canvas_rgb = canvas.convert("RGB")
canvas_rgb.save(output_png, optimize=True)
canvas_rgb.save(output_jpg, quality=95, subsampling=0, optimize=True)
print(output_png)
print(output_jpg)
