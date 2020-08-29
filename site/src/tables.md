---
layout: layout.njk
title: "@code-blocks/tables"
description: "Easy HTML tables in markdown with code blocks"
---

## Install

```bash
npm install @code-blocks/tables
```

Use with [rehype](https://github.com/rehypejs/rehype) or [eleventy](https://www.11ty.dev/). See how on [here](/).

## Usage

Because creating tables in pure markdown can be painful...

**language: `csv-table`**

```
Letters, Amount
A,28
B,55
C,43
D,91
E,81
F,53
```

```csv-table
Letters, Amount
A,28
B,55
C,43
D,91
E,81
F,53
```

If other than `,` set the separator in the options:

```
---
separator: \t
---
Letters\tAmount
A\t28
B\t55
C\t43
D\t91
E\t81
F\t53
```

```csv-table
---
separator: \t
---
Letters\tAmount
A\t28
B\t55
C\t43
D\t91
E\t81
F\t53
```