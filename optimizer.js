import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";
import { createRequire } from "module";

/*
ADD This to run during build, remove the assets from output and make it run to the output
*/
const require = createRequire(import.meta.url);
const glob = require("glob");

// Source and destination directories
const srcDir = "pages/assets/**/*.{jpg,png}";
const destDir = "pages/webp";

// Function to process images
async function optimizeImages() {
  // Find all images
  const files = glob.sync(srcDir);

  for (const file of files) {
    // Get the relative path from the source directory
    const relativePath = path.relative("pages/assets", file);

    // Construct the destination path
    const destPath = path.join(destDir, relativePath);

    // Ensure the destination directory exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    // Optimize and save the image
    await imagemin([file], {
      destination: path.dirname(destPath),
      plugins: [
        imageminWebp(),
        // imageminJpegtran(),
        // imageminPngquant({
        //     quality: [0.6, 0.8]
        // })
      ],
    });
    console.log(`Optimized: ${file} -> ${destPath}`);
  }
}

optimizeImages();

// (async () => {
//   await imagemin(["./pages/assets/**/*.{jpg,png}"], {
//     destination: "./optimized/pics",
//     plugins: [
//       imageminJpegtran(),
//       imageminPngquant({
//         quality: [0.6, 0.8],
//       }),
//     ],
//   });
//   console.log("Images optimized");
// })();
// (async () => {
//   await imagemin(["./pages/assets/**/*.{jpg,png}"], {
//     destination: "optimized/images",
//     plugins: [imageminWebp({ quality: 80 })],
//   });
//   console.log("Images optimized");
// })();
