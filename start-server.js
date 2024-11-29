import chokidar from 'chokidar'; // Import chokidar for file watching
import livereload from 'livereload'; // Import livereload for live reloading
import path from 'path'; // Import path module for handling file paths
import { fileURLToPath } from 'url'; // Import fileURLToPath to convert file URLs to paths
import { spawn } from 'child_process'; // Import spawn from child_process to spawn new processes
import config from './config.js'; // Import the config
import { build } from './esbuild.js'; // Import the build function

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serverProcess; // Variable to hold the server process
let livereloadServer; // Variable to hold the livereload server

/**
 * Starts the server by spawning a new process.
 * If an existing server process is running, it kills the process before starting a new one.
 * If the specified port is in use, it attempts to start the server on the next available port.
 *
 * @param {number} port - The port number to start the server on.
 * @returns {void}
 */
const startServer = (port) => {
  // If there's an existing server process, kill it
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }

  // Add a delay to ensure the port is released before starting a new server process
  setTimeout(() => {
    // Spawn a new server process
    serverProcess = spawn('node', ['public/app.js'], {
      stdio: 'inherit', // Inherit stdio to display server logs in the console
      env: { ...process.env, PORT: port } // Pass the environment variables, including the port
    });

    // Handle server process close event
    serverProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Server process exited with code ${code}`);
      }
    });

    // Handle server process error event
    serverProcess.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Trying to restart the server on a different port...`);
        // If the port is in use, try to restart the server on the next port
        setTimeout(() => startServer(port + 1), 1000);
      } else {
        console.error('Server process error:', sanitizeError(error));
      }
    });
  }, 1000); // 1-second delay to ensure the port is released
};

/**
 * Starts the build process and server.
 * If in development mode, sets up livereload and file watching for automatic rebuilds.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the server and file watching setup are complete.
 */
const start = async () => {
  // Log the current NODE_ENV and port
  console.log(`Current NODE_ENV: ${config.app.environment}`);
  console.log(`Server running on port: ${config.app.port}`);

  // Build the project
  await build();
  // Start the server on the configured port
  startServer(config.app.port);

  // If in development mode, set up livereload and file watching
  if (process.env.NODE_ENV === 'development') {
    // Start livereload server
    livereloadServer = livereload.createServer();
    livereloadServer.watch(path.join(__dirname, 'public'));

    // Watch for changes in JS and SCSS files
    const watcher = chokidar.watch('src/**/*.{js,scss}', {
      ignored: /node_modules/, // Ignore node_modules directory
      persistent: true, // Keep watching for changes
    });

    // Handle file change event
    watcher.on('change', async (filePath) => {
      console.log(`File ${filePath} has been changed. Rebuilding...`);
      // Rebuild the project
      await build();
      // Refresh livereload server
      livereloadServer.refresh('/');
      // Restart the server
      startServer(config.app.port);
    });

    // Handle watcher ready event
    watcher.on('ready', () => {
      console.log('Watching for file changes...');
    });

    // Handle watcher error event
    watcher.on('error', (error) => {
      console.error('Watcher error:', sanitizeError(error));
    });
  }
};

/**
 * Sanitizes error messages to remove sensitive information before logging.
 * This function can be customized to remove or mask specific details.
 *
 * @param {Error} error - The error object to sanitize.
 * @returns {object} A sanitized version of the error object.
 */
const sanitizeError = (error) => {
  // Example: Remove stack traces or any sensitive data from the error object
  const sanitizedError = { ...error };
  delete sanitizedError.stack; // Remove stack trace
  // Remove any other sensitive information if necessary
  if (sanitizedError.message) {
    sanitizedError.message = sanitizedError.message.replace(/sensitive information/g, '[REDACTED]');
  }
  return sanitizedError;
};

// Start the build and server process
start().catch((error) => {
  // Log sanitized error
  console.error('Start script failed:', sanitizeError(error));
  process.exit(1);
});
