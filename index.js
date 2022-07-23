const es5TaskFn = require('./lib/webpack.es5.js');
const { stripIndent } = require('common-tags');

module.exports = {
  improve: '@apostrophecms/asset',
  init(self) {
    self.es5TaskFn = es5TaskFn;
  },
  extendMethods(self) {
    return {
      configureBuilds(_super) {
        _super();
        self.builds['src-es5'] = {
          // An alternative build from the same sources for IE11
          source: 'src',
          webpack: true,
          scenes: [ 'public', 'apos' ],
          // The CSS from the src build is identical, do not duplicate it
          outputs: [ 'js' ],
          label: 'apostrophe:ie11Build',
          // Load index.js and index.scss from each module
          index: true,
          // The polyfills babel will be expecting
          prologue: stripIndent`
            import "${require.resolve('core-js/stable')}";
            import "${require.resolve('regenerator-runtime/runtime')}";
            ${self.srcPrologue}
          `,
          // Load only in browsers that do not support ES6 modules
          condition: 'nomodule'
        };
      }
    }
  }
};
