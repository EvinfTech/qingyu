module.exports = {
  chainWebpack: (config) => {
    config.resolve.extensions.delete('.ts');
    config.module
      .rule('ts')
      .uses.clear();
  }
}