const { getDefaultConfig } = require('expo/metro-config');
const { getDefaultConfig: metroGetDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Modify the defaultConfig here if needed

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await metroGetDefaultConfig(__dirname);
  assetExts.push('cjs');

  return defaultConfig;
})();
