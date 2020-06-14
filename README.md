# CW.js

[![Node.js CI](https://github.com/mastercw/cw.js/workflows/Node.js%20CI/badge.svg)](https://github.com/mastercw/cw.js/actions)
[![NPM](https://img.shields.io/npm/v/cw)](https://www.npmjs.com/package/cw)

A comprehensive Morse Code (CW) library, for use in both client and server runtime environments.

## Features

- [WebAudio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)-based playback of Morse Code symbols
- Complete control over speed and tone pitch
- Supports custom [Farnsworth speed](https://en.wikipedia.org/wiki/Morse_code#Farnsworth_speed) to differentiate between character speed and text speed

## Usage

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

#### CSS

Dit and dah symbols can be rendered nicely by adding the `dit` and `dah` classes to `<span>` tags:

```html
<span id="c">
  <span class="dah"></span>
  <span class="dit"></span>
  <span class="dah"></span>
  <span class="dit"></span>
</span>
```

For more examples see the [examples/](examples/) directory.

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

## License

ISC
