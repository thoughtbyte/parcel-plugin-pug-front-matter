module.exports = function(bundler) {
  bundler.addAssetType('pug', require.resolve('./PugAsset.js'));
  bundler.addAssetType('jade', require.resolve('./PugAsset.js'));
};
