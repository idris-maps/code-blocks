---
layout: layout.njk
title: "@code-blocks/prism"
short: "Code highlighting"
description: "Highlight markdown code blocks with prism"
tags: renderer
---

## Install

```bash
npm install @code-blocks/prism
```

Use with [rehype](https://github.com/rehypejs/rehype) or [eleventy](https://www.11ty.dev/). See how [here](/).

## Usage

There is already an official syntax [highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) for eleventy. If you are just going to highlight code blocks, use that instead. However, if you are using other `@code-blocks` renderers, it will break the official plugin.

This library only transforms code blocks into `<span>` elements for [prism](https://prismjs.com/), you will need to add one of their [CSS themes](https://github.com/PrismJS/prism/tree/master/themes) to your page.

**Supported languages**

`abap` `abnf` `actionscript` `ada` `adoc` `agda` `al` `antlr4` `apacheconf` `apl` `applescript` `aql` `arduino` `arff` `asciidoc` `asm6502` `aspnet` `atom` `autohotkey` `autoit` `bash` `basic` `batch` `bbcode` `bison` `bnf` `brainfuck` `brightscript` `bro` `c` `cil` `clike` `clojure` `cmake` `coffee` `coffeescript` `conc` `concurnas` `context` `cpp` `crystal` `cs` `csharp` `csp` `css` `cypher` `d` `dart` `dax` `dhall` `diff` `django` `dns-zone` `dns-zone-file` `docker` `dockerfile` `dotnet` `ebnf` `editorconfig` `eiffel` `ejs` `elisp` `elixir` `elm` `emacs` `emacs-lisp` `erb` `erlang` `eta` `etlua` `excel-formula` `factor` `firestore-security-rules` `flow` `fortran` `fsharp` `ftl` `g4` `gamemakerlanguage` `gcode` `gdscript` `gedcom` `gherkin` `git` `gitignore` `glsl` `gml` `go` `graphql` `groovy` `haml` `handlebars` `haskell` `haxe` `hcl` `hgignore` `hlsl` `hpkp` `hs` `hsts` `html` `http` `ichigojam` `icon` `iecst` `ignore` `inform7` `ini` `io` `j` `java` `javadoc` `javadoclike` `javascript` `javastacktrace` `jinja2` `jolie` `jq` `js` `jsdoc` `json` `json5` `jsonp` `jsstacktrace` `jsx` `julia` `keyman` `kotlin` `kt` `kts` `latex` `latte` `less` `lilypond` `liquid` `lisp` `livescript` `llvm` `lolcode` `lua` `ly` `makefile` `markdown` `markup` `markup-templating` `mathml` `matlab` `md` `mel` `mizar` `monkey` `moon` `moonscript` `mscript` `n1ql` `n4js` `n4jsd` `nand2tetris-hdl` `nasm` `neon` `nginx` `nim` `nix` `npmignore` `nsis` `objc` `objectivec` `objectpascal` `ocaml` `opencl` `oz` `parigp` `parser` `pascal` `pascaligo` `pbfasm` `pcaxis` `pcode` `peoplecode` `perl` `php` `phpdoc` `plsql` `powerquery` `powershell` `pq` `processing` `prolog` `properties` `protobuf` `pug` `puppet` `pure` `purebasic` `px` `py` `python` `q` `qml` `qore` `r` `racket` `rb` `rbnf` `reason` `regex` `renpy` `rest` `rip` `rkt` `roboconf` `robot` `robotframework` `rpy` `rq` `rss` `ruby` `rust` `sas` `sass` `scala` `scheme` `scss` `shell` `shell-session` `shortcode` `sln` `smali` `smalltalk` `smarty` `sol` `solidity` `solution-file` `soy` `sparql` `splunk-spl` `sqf` `sql` `ssml` `stylus` `svg` `swift` `t4` `t4-cs` `t4-templating` `t4-vb` `tap` `tcl` `tex` `textile` `toml` `trig` `ts` `tsx` `tt2` `turtle` `twig` `typescript` `uc` `unrealscript` `uscript` `vala` `vb` `vba` `vbnet` `velocity` `verilog` `vhdl` `vim` `visual-basic` `warpscript` `wasm` `webmanifest` `wiki` `xeora` `xeoracube` `xls` `xlsx` `xml` `xojo` `xquery` `yaml` `yang` `yml` `zig`