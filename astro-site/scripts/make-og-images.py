"""Generate the 1200x630 JPG social share images in public/og/ (run from astro-site/).

JPG at the 1.91:1 ratio works on Facebook, LinkedIn, WhatsApp, X and Slack, which do not all
accept WebP. Page images come from the page banners; the homepage/default image is branded.
Usage: python3 scripts/make-og-images.py [path/to/logo.png]
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT = "public/og"
BANNERS = {  # slug -> (banner file, horizontal focus 0..1 of the subject)
    "remote-work-from-home-jobs-us": ("remote-work-from-home-jobs-us-banner.webp", 0.60),
    "remote-customer-service-jobs": ("remote-customer-service-jobs-banner.webp", 0.62),
    "part-time-work-from-home-customer-service-jobs": ("part-time-work-from-home-customer-service-banner.webp", 0.38),
    "remote-call-center-jobs": ("remote-call-center-jobs-banner.webp", 0.60),
    "bilingual-work-from-home-jobs": ("bilingual-work-from-home-jobs-banner.webp", 0.50),
}

def save(img, name):
    path = f"{OUT}/{name}.jpg"
    q = 88
    while True:
        img.convert("RGB").save(path, "JPEG", quality=q, optimize=True, progressive=True)
        if os.path.getsize(path) < 280 * 1024 or q <= 60: break
        q -= 4
    print(path, f"{os.path.getsize(path)//1024} KB")

for slug, (file, focus) in BANNERS.items():
    im = Image.open(f"src/assets/banners/{file}").convert("RGB")
    scale = H / im.height                      # cover 630px height
    im = im.resize((round(im.width * scale), H), Image.LANCZOS)
    x = round(min(max(im.width * focus - W / 2, 0), im.width - W))
    save(im.crop((x, 0, x + W, H)), slug)

# branded homepage / default image
logo_path = sys.argv[1] if len(sys.argv) > 1 else None
navy, orange, sky = (27, 42, 74), (240, 134, 44), (220, 238, 245)
img = Image.new("RGB", (W, H), navy)
d = ImageDraw.Draw(img)
d.rectangle((0, H - 14, W, H), fill=orange)
font = lambda w, s: ImageFont.truetype(f"node_modules/@fontsource/poppins/files/poppins-latin-{w}-normal.woff", s)
if logo_path:
    logo = Image.open(logo_path).convert("RGBA"); logo = logo.crop(logo.split()[3].getbbox())
    h = 170; logo = logo.resize((round(logo.width * h / logo.height), h), Image.LANCZOS)
    img.paste(logo, (80, 70), logo)
d.text((290 if logo_path else 80, 92), "Vibe Connect", font=font(700, 54), fill="white")
d.text((290 if logo_path else 80, 158), "VIRTUAL SERVICES", font=font(600, 28), fill=sky)
y = 290
for line, f in (("Work From Home.", font(800, 84)), ("Get Paid Semi-Monthly.", font(800, 84))):
    d.text((80, y), line, font=f, fill="white"); y += 104
d.text((80, y + 24), "Remote customer service jobs. No experience needed.", font=font(500, 34), fill=sky)
save(img, "home")
