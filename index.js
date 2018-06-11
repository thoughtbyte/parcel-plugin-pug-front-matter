module.exports = function(bundler) {
  bundler.addAssetType('pug', require.resolve('./src/PugAsset.js'));
  bundler.addAssetType('jade', require.resolve('./src/PugAsset.js'));
};
