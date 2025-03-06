# CW.js

[![Node.js CI](https://github.com/mastercw/cw.js/workflows/Node.js%20CI/badge.svg)](https://github.com/mastercw/cw.js/actions)
[![NPM](https://img.shields.io/npm/v/cw)](https://www.npmjs.com/package/cw)

A comprehensive Morse Code (CW) library, brought to you by [Master CW](https://www.mastercw.com/).

## Usage

### Node

Install the package via `npm` or `yarn`:

```bash
$ npm install cw
```

#### ES Modules

```javascript
import cw from "cw";
console.log(cw.codes["C"]); // "-.-."
cw.play("hello world");
```

#### CommonJS

```javascript
const cw = require("cw");
console.log(cw.codes["C"]); // "-.-."
```

### Browser

You can either build the browser bundle yourself with:

```bash
$ npm install
$ npm run build
```

Which will create `dist/cw.js` and `dist/cw.min.js`. Or you can use it from a CDN:

#### jsDelivr CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/npm/cw@0.3.0/dist/cw.min.js"></script>
```

or just use `latest`:

```html
<script src="https://cdn.jsdelivr.net/npm/cw@latest/dist/cw.min.js"></script>
```

#### Legacy CDN

The legacy CDN is still available for backwards compatability but will be deprecated soon:

```html
<script src="https://cwjs.mastercw.com/cw.min.js"></script>
```

Once the script is loaded you can call the `cw.play()` function:

```html
<script>
  cw.play("hello world");
</script>
```

Options can be passed to customize the played sequence:

```js
cw.play("abcd", {
  tone: 800, // tone frequency in Hz
  wpm: 20, // character speed in words per minute (WPM)
  fwpm: 10, // farnsworth speed in words per minute (WPM)
});
```

In cases of multiple plays, it is recommended to create a global `audioContext` object:

```js
// Initialize audio context once
let actx = cw.initAudioContext({ tone: 600 }); // tone is passed here

// Reuse the audio context for multiple plays
cw.play("abcd", { actx, wpm: 10 });
cw.play("efgh", { actx, wpm: 20 });
cw.play("ijkl", { actx, wpm: 30 });
```

For more examples see the [examples/](examples/) directory.

### Testing

```bash
$ npm test
```

## License

ISC
