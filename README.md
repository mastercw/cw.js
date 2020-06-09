# CW.js

![NPM](https://img.shields.io/npm/v/cw)
![Node.js CI](https://github.com/mastercw/cw.js/workflows/Node.js%20CI/badge.svg)

A comprehensive Morse Code (CW) library

## Usage

### Node

Install the package via `npm` or `yarn`:

```bash
$ npm install cw
```

You can then use:

```node
const cw = require("cw");
console.log(cw.codes["C"]); // "-.-."
```

### Browser

You can either build the browser bundle yourself with:

```bash
$ npm install
$ npm run gulp
```

Which will create `dist/cw.js` and `dist/cw.min.js`. Or you can just use it from a CDN:

```html
<script src="https://cdn.example.com/cw.min.js"></script>
```

Once the script is loaded you can call it with a typical usage:

```html
<script>
  var actx = cw.initAudioContext(700);
  var td = cw.tdit(20);
  var tfd = cw.tfdit(20, 10);
  cw.playWord(actx.actx, actx.gain, "hello", td, tfd);
</script>
```

For more examples see the [examples/](examples/) directory.

## License

ISC
