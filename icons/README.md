# App Icons

This folder should contain PWA icons in the following sizes:

## Required Sizes:
- icon-72.png (72x72px)
- icon-96.png (96x96px)
- icon-128.png (128x128px)
- icon-144.png (144x144px)
- icon-152.png (152x152px)
- icon-192.png (192x192px)
- icon-384.png (384x384px)
- icon-512.png (512x512px)

## Design Guidelines:
- **Background Color**: #1a1a2e (dark blue)
- **Icon Style**: Flat design with dice symbol 🎲
- **Format**: PNG with transparency
- **Content**: Simple, recognizable dice icon
- **Safe Zone**: Keep important content within 80% of the canvas

## Tools for Creating Icons:
1. **Online**: https://realfavicongenerator.net/
2. **Figma/Sketch**: Design at 512x512, export multiple sizes
3. **ImageMagick**: Resize from a single large source
4. **PWA Asset Generator**: `npx pwa-asset-generator`

## Quick Generation (if you have a source image):
```bash
# Using ImageMagick
magick source.png -resize 72x72 icon-72.png
magick source.png -resize 96x96 icon-96.png
magick source.png -resize 128x128 icon-128.png
magick source.png -resize 144x144 icon-144.png
magick source.png -resize 152x152 icon-152.png
magick source.png -resize 192x192 icon-192.png
magick source.png -resize 384x384 icon-384.png
magick source.png -resize 512x512 icon-512.png
```
