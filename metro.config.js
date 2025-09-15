const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs'); // This adds support for .cjs files, which are CommonJS modules.
/* 
 by including support for .cjs files, it would ensure that all libraries and dependencies that do use these file
 formats are properly resolved, avoiding potential issues when bundling the application. 
*/
module.exports = defaultConfig; // Export the modified configuration to be used by Metro bundler.