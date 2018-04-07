# PostCSS Decrease Specificity [![Build Status][ci-img]][ci] [![npm](npm-img)](npm)

[PostCSS] plugin that decreases the specificity of given selector.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/felixmosh/postcss-decrease-specificity.svg
[ci]:      https://travis-ci.org/felixmosh/postcss-decrease-specificity
[npm-img]: https://img.shields.io/npm/v/postcss-decrease-specificity.svg
[npm]:     https://www.npmjs.com/package/postcss-decrease-specificity
[descendant combinator]: https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors

```css
.foo1 .bar1 .foo2 .bar2 {
    /* Input example */
}
```

```css
.bar1 .foo2 .bar2 {
  /* Output example */
}
```

## Options
`depth`: Number (default: 3)

## Usage

```js
const plugin = require('postcss-decrease-specificity');
postcss([ plugin(options) ])
  .then((result) => {
     result.css // modified css
  });
```

## Tests
```
$ npm test
```

### Notes
1. This plugin takes into consideration as `depth` only **class** selectors with **[descendant combinator]**, therefore, `.a .b .c > .d tag .f{ decl:1 }` will become `.b .c > .d tag .f{ decl:1 }`

See [PostCSS] docs for examples for your environment.
