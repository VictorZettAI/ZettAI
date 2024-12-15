import { glob } from 'glob';
import sharp from 'sharp';
import { optimize } from 'svgo';
import fs from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import SVGSpriter from 'svg-sprite';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');
const SPRITES_DIR = path.join(PUBLIC_DIR, 'sprites');

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath);
  if (ext === '.svg') return; // SVGs will be handled by sprite generator

  const outputWebp = imagePath.replace(ext, '.webp');
  const outputAvif = imagePath.replace(ext, '.avif');

  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Optimize original
    await image
      .resize(metadata.width, metadata.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80, progressive: true })
      .toFile(imagePath + '.opt');

    // Generate WebP
    await image
      .webp({ quality: 80 })
      .toFile(outputWebp);

    // Generate AVIF
    await image
      .avif({ quality: 65 })
      .toFile(outputAvif);

    // Replace original with optimized version
    await fs.rename(imagePath + '.opt', imagePath);

    console.log(`✓ Optimized: ${path.basename(imagePath)}`);
  } catch (error) {
    console.error(`✗ Failed to optimize: ${path.basename(imagePath)}`, error);
  }
}

async function optimizeVideo(videoPath) {
  const filename = path.basename(videoPath, path.extname(videoPath));
  const outputWebm = path.join(VIDEOS_DIR, `${filename}.webm`);
  const outputMp4 = path.join(VIDEOS_DIR, `${filename}.mp4`);

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      // MP4 with h264
      .output(outputMp4)
      .videoCodec('libx264')
      .size('?x720')
      .videoBitrate('1000k')
      .autopad()
      // WebM with VP9
      .output(outputWebm)
      .videoCodec('libvpx-vp9')
      .size('?x720')
      .videoBitrate('1000k')
      .autopad()
      .on('end', () => {
        console.log(`✓ Optimized video: ${filename}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`✗ Failed to optimize video: ${filename}`, err);
        reject(err);
      })
      .run();
  });
}

async function generateSvgSprite() {
  const spriter = new SVGSpriter({
    dest: SPRITES_DIR,
    mode: {
      symbol: {
        sprite: 'sprite.svg',
        example: true
      }
    }
  });

  const svgFiles = await glob('**/*.svg', { cwd: IMAGES_DIR });

  for (const file of svgFiles) {
    const svgPath = path.join(IMAGES_DIR, file);
    const svgContent = await fs.readFile(svgPath, 'utf8');
    
    const optimizedSvg = optimize(svgContent, {
      multipass: true,
      plugins: [
        'preset-default',
        'removeDimensions',
        {
          name: 'removeAttrs',
          params: { attrs: '(width|height)' }
        }
      ]
    });

    spriter.add(
      path.resolve(svgPath),
      null,
      optimizedSvg.data
    );
  }

  return new Promise((resolve, reject) => {
    spriter.compile((error, result) => {
      if (error) {
        reject(error);
        return;
      }

      // Ensure sprites directory exists
      fs.mkdir(SPRITES_DIR, { recursive: true })
        .then(() => {
          // Write sprite file
          return fs.writeFile(
            path.join(SPRITES_DIR, 'sprite.svg'),
            result.symbol.sprite.contents
          );
        })
        .then(() => {
          console.log('✓ Generated SVG sprite');
          resolve();
        })
        .catch(reject);
    });
  });
}

async function main() {
  try {
    // Create output directories
    await fs.mkdir(SPRITES_DIR, { recursive: true });

    // Optimize images
    const images = await glob('**/*.{jpg,jpeg,png,gif}', { cwd: IMAGES_DIR });
    for (const image of images) {
      await optimizeImage(path.join(IMAGES_DIR, image));
    }

    // Generate SVG sprite
    await generateSvgSprite();

    // Optimize videos
    const videos = await glob('**/*.{mp4,mov,avi}', { cwd: VIDEOS_DIR });
    for (const video of videos) {
      await optimizeVideo(path.join(VIDEOS_DIR, video));
    }

    console.log('✓ Asset optimization complete!');
  } catch (error) {
    console.error('✗ Asset optimization failed:', error);
    process.exit(1);
  }
}

main();
