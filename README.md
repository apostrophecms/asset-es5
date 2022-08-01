**TODO:** Update the badge URLs for the new module's repo.

<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80">

  <h1>ES5 Support for ApostropheCMS 3.x</h1>
  <p>
    <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20Apostrophe%203-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd">
    </a>
    <a aria-label="Test status" href="https://github.com/apostrophecms/asset-es5/actions">
      <img alt="GitHub Workflow Status (branch)" src="https://img.shields.io/github/workflow/status/apostrophecms/asset-es5/Tests/main?label=Tests&labelColor=000000&style=for-the-badge">
    </a>
    <a aria-label="Join the community on Discord" href="http://chat.apostrophecms.org">
      <img alt="" src="https://img.shields.io/discord/517772094482677790?color=5865f2&label=Join%20the%20Discord&logo=discord&logoColor=fff&labelColor=000&style=for-the-badge&logoWidth=20">
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/asset-es5/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
    </a>
  </p>
</div>

Installing and enabling this module turns on an ES5, Internet Explorer 11-compatible backwards compatibility build for the public-facing frontend JavaScript bundle in Apostrophe 3.x. Modern browsers will still get a modern build and will not pay a performance penalty, although there is a performance impact during development and deployment.

## Limitations

* There is not and never will be support for the admin UI in IE11. This module only addresses the "public" JavaScript (imported by `ui/src/index.js` files).

* This module will polyfill JavaScript language features via `babel`, but doesn't attempt to polyfill missing browser features. You can of course load your own polyfills. Some browser features, like `Observer`, cannot be polyfilled for IE11.
 
* `ui/public` javaScript files are loaded exactly as-is, by design. If you need these to work in IE11, they must already be ES5.

* Using this module will add a lot of `npm install` time, as well as asset build time. IE11 is no longer supported by Microsoft and has most likely been uninstalled automatically from most systems.

Think it over: are you sure you need this module?

## Installation

```
npm install @apostrophecms/asset-es5
```

## Usage

Enable this module in the `app.js` file:

```javascript
require('apostrophe')({
  shortName: 'my-project',
  modules: {
    '@apostrophecms/asset-es5': {}
  }
});
```
