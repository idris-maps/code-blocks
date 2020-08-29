---
layout: layout.njk
title: "@code-blocks/math"
description: "Use mathup in markdown code blocks"
---

## Install

```bash
npm install @code-blocks/math
```

Use with [rehype](https://github.com/rehypejs/rehype) or [eleventy](https://www.11ty.dev/). See how on [here](/).

## Usage

This library uses [mathup](https://runarberg.github.io/mathup/) under the hood. For more information about the syntax, checkout their website.

**language: `mathup`**

```
grad f(x,y) = ((del f)/(del x) (x, y), (del f)/(del y)(x,y))
```

```mathup
grad f(x,y) = ((del f)/(del x) (x, y), (del f)/(del y)(x,y))
```

```
||(bf x)||^2 = [x_1 ; x_2 ; x_3]*[x_1 ; x_2 ; x_3]
```

```mathup
||(bf x)||^2 = [x_1 ; x_2 ; x_3]*[x_1 ; x_2 ; x_3]
```