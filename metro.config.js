const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add custom minifier settings to disable minification
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_classnames: false, // Optional: Keep original class names
    keep_fnames: false, // Optional: Keep original function names
    mangle: true,
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true,
    }, // Disable code compression (part of minification)
    output: {
      beautify: false, // Make the output readable
      comments: false, // Keep comments in the output
    },
  },
};

module.exports = config;
