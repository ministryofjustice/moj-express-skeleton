
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { builtinModules } from 'module';
import dotenv from 'dotenv';
import { copy } from 'esbuild-plugin-copy';
import fs from 'fs-extra';
import path from 'path';
import config from './config.js'; // Import the config

// Load environment variables from .env file
dotenv.config();

// Function to copy assets
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
                    // Inject the relative assets path into SCSS
                    // Here we are overriding the $govuk-assets-path variable for the build process
                    // precompile: (source) => `$govuk-assets-path: "./assets/" !default;\n${source}`
                    // using path transformation to replace $govuk-assets-path references
                    transform: (source) => {
                        return source
                            // Replace $govuk-assets-path references for fonts
                            .replace(/url\(["']?\/assets\/fonts\/([^"'\)]+)["']?\)/g, 'url("./assets/fonts/$1")')
                            // Replace $govuk-assets-path references for images
                            .replace(/url\(["']?\/assets\/images\/([^"'\)]+)["']?\)/g, 'url("./assets/images/$1")');
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

        // Bundle JS (even though we don't have custom JS for now, it's ready)
        const jsBuildOptions = {
            entryPoints: ['src/app.js'],
            bundle: true,
            platform: 'node',
            target: 'es2020',
            format: 'esm', // Set format to ES Module
            outdir: 'public/js',
            sourcemap: true,
            minify: true, // Minify JS
            external: externalModules, // Use dynamically generated list of external modules
            plugins: [
                copy({
                    assets: {
                        from: ['./node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js'],
                        to: ['./govuk-frontend.min.js']
                    }
                })
            ]
        };

        // Build SCSS
        await esbuild.build(scssBuildOptions).catch((error) => {
            console.error('SCSS build failed:', error);
            process.exit(1);
        });

        // Build JS
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

// If this script is run directly, execute the build function
if (import.meta.url === `file://${process.argv[1]}`) {
    build().catch((error) => {
        console.error('Build script failed:', error);
        process.exit(1);
    });
}
