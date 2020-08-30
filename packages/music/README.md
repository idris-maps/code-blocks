# @code-blocks/music

## Install

```bash
npm install @code-blocks/music
```

Use with [rehype](https://github.com/rehypejs/rehype) or [eleventy](https://www.11ty.dev/). See how [here](https://github.com/idris-maps/code-blocks).

## Usage

This library uses [abc.js](https://www.abcjs.net/) under the hood. For more information about the syntax, checkout their website.

**language: `music-abc`**

```
X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|\
	"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|\
	"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|\
	"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|\
	"D"afe^c dBAF|"Em"DEFD E2:|
```

![Music sheet example](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_music.png)
