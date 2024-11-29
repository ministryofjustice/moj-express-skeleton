// src/utils/buildHelper.ts
import fs from 'fs';

/**
 * Generate a random build number as a string.
 * @returns {string} - A random build number.
 */
export const getBuildNumber = () => {
  return Math.floor(Math.random() * 10000).toString();
};

/**
 * Get the latest build file from the specified directory.
 * @param {string} directory - The directory to search in.
 * @param {string} prefix - The prefix of the build files.
 * @param {string} extension - The extension of the build files.
 * @returns {string} - The name of the latest build file or an empty string if none found.
 */
export const getLatestBuildFile = (directory, prefix, extension) => {
  const files = fs.readdirSync(directory);
  const pattern = new RegExp(`^${prefix}\\.\\d+\\.${extension}$`);
  const matchingFiles = files.filter(file => pattern.test(file));
  return matchingFiles.length > 0 ? matchingFiles[0] : '';
};