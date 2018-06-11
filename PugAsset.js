const path = require('path');
const matter = require('gray-matter');
const Asset = require('parcel-bundler/lib/Asset');
const localRequire = require('parcel-bundler/lib/utils/localRequire');

class PugAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'html';
  }

  async generate() {
    const pug = await localRequire('pug', this.name);
    const config = (await this.getConfig(['.pugrc', '.pugrc.js', 'pug.config.js'])) || {};
    const rawPugFile = matter(this.contents);

    const compiled = pug.compile(rawPugFile.contents, {
      compileDebug: false,
      filename: this.name,
      basedir: path.dirname(this.name),
      pretty: !this.options.minify,
      templateName: path.basename(this.basename, path.extname(this.basename)),
      filters: config.filters,
      filterOptions: config.filterOptions,
      filterAliases: config.filterAliases,
    });

    if (compiled.dependencies) {
      for (let item of compiled.dependencies) {
        this.addDependency(item, {
          includedInParent: true,
        });
      }
    }

    return compiled({ ...config.locals, ...rawPugFile.data });
  }
}

module.exports = PugAsset;
