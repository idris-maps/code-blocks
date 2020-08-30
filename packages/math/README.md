# @code-blocks/math

## Install

```bash
npm install @code-blocks/math
```

Use with [rehype](https://github.com/rehypejs/rehype) or [eleventy](https://www.11ty.dev/). See how [here](https://github.com/idris-maps/code-blocks).

## Usage

This library uses [mathup](https://runarberg.github.io/mathup/) under the hood. For more information about the syntax, checkout their website.

**language: `mathup`**

```
grad f(x,y) = ((del f)/(del x) (x, y), (del f)/(del y)(x,y))
```

![Math example 0](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_math(0).png)

```
||(bf x)||^2 = [x_1 ; x_2 ; x_3]*[x_1 ; x_2 ; x_3]
```

![Math example 1](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_math(1).png)