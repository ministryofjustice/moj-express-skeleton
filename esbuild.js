import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { builtinModules } from 'module';
import dotenv from 'dotenv';
import { copy } from 'esbuild-plugin-copy';
import fs from 'fs-extra';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

/**
 * Copies assets such as fonts and images from the govuk-frontend package
 * to the 'public/assets' directory for use in the application.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when assets are successfully copied.
 */
const copyAssets = async () => {
  try {
    // Copy fonts and images to 'public/assets'
    await fs.copy(
      path.resolve('./node_modules/govuk-frontend/dist/govuk/assets'),
      path.resolve('./public/assets')
    );
    console.log('Assets copied successfully.');
  } catch (error) {
    console.error('Failed to copy assets:', error);
    process.exit(1);
  }
};

/**
 * Builds the SCSS and JavaScript files for the application using esbuild.
 * The build process includes copying assets, compiling SCSS with transformed paths,
 * and bundling JavaScript files for both server and client use.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the build process completes successfully.
 */
const build = async () => {
  try {
    // List of additional external dependencies
    const additionalExternals = [
      'express', 'nunjucks', 'dotenv', 'crypto', 'cookie-signature', 'cookie-parser', 'body-parser', 'express-session'
    ];

    // Combine core Node.js modules with additional external dependencies
    const externalModules = [...builtinModules, ...additionalExternals, '*.node'];

    // Copy assets before building SCSS
    await copyAssets();

    // Bundle SCSS
    const scssBuildOptions = {
      entryPoints: ['src/scss/main.scss'],
      bundle: true,
      outdir: 'public/css',
      plugins: [
        sassPlugin({
          resolveDir: path.resolve('src/scss'),
          /**
           * Transforms SCSS source by replacing references to asset paths.
           * Adjusts the paths for fonts and images in the SCSS to ensure that they
           * correctly point to the assets during the build process.
           *
           * @param {string} source - The original SCSS source code.
           * @returns {string} The transformed SCSS source with updated asset paths.
           */
          transform: (source) => {
            return source
            // Replace $govuk-assets-path references for fonts
              .replace(/url\(["']?\/assets\/fonts\/([^"')]+)["']?\)/g,
                'url("../../node_modules/govuk-frontend/dist/govuk/assets/fonts/$1")')
            // Replace $govuk-assets-path references for images
              .replace(/url\(["']?\/assets\/images\/([^"')]+)["']?\)/g,
                'url("../../node_modules/govuk-frontend/dist/govuk/assets/images/$1")');
          }
        })
      ],
      loader: {
        '.scss': 'css',
        '.woff': 'file',
        '.woff2': 'file',
        '.png': 'file',
        '.jpg': 'file',
        '.svg': 'file'
      },
      minify: true, // Minify CSS
      sourcemap: true,
    };

    // Bundle JavaScript
    const jsBuildOptions = {
      entryPoints: ['src/app.js'],
      bundle: true,
      platform: 'node',
      target: 'es2020',
      format: 'esm', // Set format to ES Module
      outdir: 'public/',
      sourcemap: true,
      minify: true, // Minify JS
      external: externalModules, // Use dynamically generated list of external modules
      plugins: [
        copy({
          assets: [
            {
              from: './node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js',
              to: './js/govuk-frontend.min.js'
            },
            {
              from: './node_modules/govuk-frontend/dist/govuk/assets/',
              to: './assets'
            }
          ]
        })
      ]
    };

    // Build SCSS
    await esbuild.build(scssBuildOptions).catch((error) => {
      console.error('SCSS build failed:', error);
      process.exit(1);
    });

    // Build JavaScript
    await esbuild.build(jsBuildOptions).catch((error) => {
      console.error('JS build failed:', error);
      process.exit(1);
    });

    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Build process failed:', error);
    process.exit(1);
  }
};

export { build };

/**
 * If this script is run directly, execute the build function.
 * This checks if the script is being run directly using Node.js and then
 * invokes the build function, logging any errors that occur during the process.
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((error) => {
    console.error('Build script failed:', error);
    process.exit(1);
  });
}
