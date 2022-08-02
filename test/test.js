/* eslint-disable node/no-path-concat */
const testUtil = require('apostrophe/test-lib/test');
const fs = require('fs');
const assert = require('assert');
const cp = require('child_process');

describe('@apostrophecms/asset-es5 module', function () {
  let apos;

  this.timeout(600000);

  after(async function () {
    testUtil.destroy(apos);
  });

  // Improving
  it('should improve the login module', async function () {
    apos = await testUtil.create({
      shortname: 'asset-es5',
      testModule: true,
      modules: {
        '@apostrophecms/express': {
          options: {
            port: 4242,
            session: {
              secret: 'test-this-module'
            }
          }
        },
        '@apostrophecms/asset-es5': {}
      }
    });
    // Allows development of this module with apostrophe symlinked in,
    // including webpack path resolution
    const target = `${__dirname}/../node_modules/apostrophe`;
    // eslint-disable-next-line node/no-path-concat
    const link = `${__dirname}/node_modules/apostrophe`;
    if (fs.existsSync(link)) {
      fs.unlinkSync(link);
    }
    fs.symlinkSync(target, link);
  });

  it('asset task should build es5 bundle, larger than es6 bundle', async function () {
    cleanup();
    process.env.NODE_ENV = 'production';
    process.env.APOS_RELEASE_ID = 'test';
    await apos.task.invoke('@apostrophecms/asset:build');
    const es5Size = fs.statSync(`${__dirname}/public/apos-frontend/releases/test/default/public-nomodule-bundle.js`).size;
    const es6Size = fs.statSync(`${__dirname}/public/apos-frontend/releases/test/default/public-module-bundle.js`).size;
    // Make sure there are polyfills in there
    assert(es5Size > es6Size);
  });
});

function cleanup() {
  cp.execSync(`rm -rf ${__dirname}/apos-build`);
  cp.execSync(`rm -rf ${__dirname}/public/apos-frontend`);
}
