# PostCSS Decrease Specificity [![Build Status][ci-img]][ci]

[PostCSS] plugin that decreases the specificity of given selector.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/felixmosh/postcss-decrease-specificity.svg
[ci]:      https://travis-ci.org/felixmosh/postcss-decrease-specificity

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-decrease-specificity') ])
```

See [PostCSS] docs for examples for your environment.
