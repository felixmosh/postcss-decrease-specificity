# PostCSS Decrease Specificity [![Build Status][ci-img]][ci] [![npm](https://img.shields.io/npm/v/postcss-extract-styles.svg)](https://www.npmjs.com/package/postcss-extract-styles)

[PostCSS] plugin that decreases the specificity of given selector.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/felixmosh/postcss-decrease-specificity.svg
[ci]:      https://travis-ci.org/felixmosh/postcss-decrease-specificity
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
