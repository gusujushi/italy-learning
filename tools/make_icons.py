#!/usr/bin/env python3
"""生成 PWA 图标（icons/icon.svg、icon-192.png、icon-512.png、icon-maskable-512.png）。
用法：python3 tools/make_icons.py        需要 Pillow。
图标：意大利国旗三色竖条 + 白色 “IT” 字样的圆角方块，纯几何图形，不含任何第三方素材。"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'icons')
GREEN, WHITE, RED = (0, 146, 70), (244, 245, 240), (206, 43, 55)
INK = (31, 41, 55)

SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs><clipPath id="r"><rect width="512" height="512" rx="112"/></clipPath></defs>
  <g clip-path="url(#r)">
    <rect width="171" height="512" fill="#009246"/><rect x="171" width="170" height="512" fill="#f4f5f0"/><rect x="341" width="171" height="512" fill="#ce2b37"/>
    <circle cx="256" cy="256" r="150" fill="#1f2937" opacity=".92"/>
  </g>
  <text x="256" y="300" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="150" fill="#fff">IT</text>
</svg>
'''

def font(size):
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
              '/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf']:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def draw(size, maskable=False):
    S = size * 4
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if maskable:  # 安全区：内容缩在中间 80%，背景铺满
        d.rectangle([0, 0, S, S], fill=INK)
        inner = int(S * 0.8); off = (S - inner) // 2
        tile = Image.new('RGBA', (inner, inner), (0, 0, 0, 0))
        td = ImageDraw.Draw(tile)
        w = inner / 3
        td.rectangle([0, 0, w, inner], fill=GREEN); td.rectangle([w, 0, 2 * w, inner], fill=WHITE); td.rectangle([2 * w, 0, inner, inner], fill=RED)
        r = inner * 0.29
        td.ellipse([inner / 2 - r, inner / 2 - r, inner / 2 + r, inner / 2 + r], fill=INK)
        f = font(int(inner * 0.29)); bb = td.textbbox((0, 0), 'IT', font=f)
        td.text(((inner - (bb[2] - bb[0])) / 2 - bb[0], (inner - (bb[3] - bb[1])) / 2 - bb[1]), 'IT', font=f, fill=(255, 255, 255))
        im.alpha_composite(tile, (off, off))
    else:
        mask = Image.new('L', (S, S), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, S, S], radius=int(S * 0.22), fill=255)
        tile = Image.new('RGBA', (S, S), (0, 0, 0, 0))
        td = ImageDraw.Draw(tile)
        w = S / 3
        td.rectangle([0, 0, w, S], fill=GREEN); td.rectangle([w, 0, 2 * w, S], fill=WHITE); td.rectangle([2 * w, 0, S, S], fill=RED)
        r = S * 0.29
        td.ellipse([S / 2 - r, S / 2 - r, S / 2 + r, S / 2 + r], fill=INK)
        f = font(int(S * 0.29)); bb = td.textbbox((0, 0), 'IT', font=f)
        td.text(((S - (bb[2] - bb[0])) / 2 - bb[0], (S - (bb[3] - bb[1])) / 2 - bb[1]), 'IT', font=f, fill=(255, 255, 255))
        im = Image.composite(tile, im, mask)
    return im.resize((size, size), Image.LANCZOS)

def main():
    os.makedirs(OUT, exist_ok=True)
    open(os.path.join(OUT, 'icon.svg'), 'w', encoding='utf-8').write(SVG)
    draw(192).save(os.path.join(OUT, 'icon-192.png'), optimize=True)
    draw(512).save(os.path.join(OUT, 'icon-512.png'), optimize=True)
    draw(512, True).save(os.path.join(OUT, 'icon-maskable-512.png'), optimize=True)
    print('icons written to', OUT)

if __name__ == '__main__':
    sys.exit(main())
