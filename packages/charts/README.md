# @code-blocks/charts

## Install

```bash
npm install @code-blocks/charts
```

Use with [rehype](https://github.com/rehypejs/rehype) or [eleventy](https://www.11ty.dev/). See how [here](https://github.com/idris-maps/code-blocks).

## Bar chart

**language: `bar-chart`**

```
Letters,Amount
A,28
B,55
C,43
D,91
E,81
F,53
```

renders as:

![Charts example 0](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(0).png)


### Options

* `width` (defaults to `400`)
* `height` (defaults to `200`)
* `color` (defaults to `steelblue`)
* `className` (defaults to `chart`)

The same bar chart using options:

```
---
width: 500
height: 100
color: indianred
---
Letters,Amount
A,28
B,55
C,43
D,91
E,81
F,53
```

![Charts example 1](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(1).png)

## Line chart

**language: `line-chart`**

```
Date,Value
2010-01-01,28
2012-02-22,55
2013-01-13,43
2015-01-04,91
2015-01-05,81
2017-12-06,53
2018-06-07,19
2019-11-08,81
2020-01-09,52
```

![Charts example 2](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(2).png)

### Options

* `width` (defaults to `400`)
* `height` (defaults to `200`)
* `color` (defaults to `steelblue`)
* `temporal` (defaults to `false`)
* `className` (defaults to `chart`)

If `temporal` is not `true`, the x axis is assumed to be `nominal`, as in the example above. As we are using dates here, set `temporal` to `true`.

```
---
temporal: true
---
Date,Value
2010-01-01,28
2012-02-22,55
2013-01-13,43
2015-01-04,91
2015-01-05,81
2017-12-06,53
2018-06-07,19
2019-11-08,81
2020-01-09,52
```

![Charts example 3](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(3).png)

## Area chart

**language: `area-chart`**

```
---
temporal: true
---
Date,Value
2010-01-01,28
2012-02-22,55
2013-01-13,43
2015-01-04,91
2015-01-05,81
2017-12-06,53
2018-06-07,19
2019-11-08,81
2020-01-09,52
```

![Charts example 4](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(4).png)

### Options

Area chart options are the same as for line charts.

## Multiline chart

**language: `multiline-chart`**

```
---
temporal: true
---
Date,Value,Stock
2010-01-01,28,AAA
2012-02-22,55,AAA
2013-01-13,43,AAA
2015-01-04,91,AAA
2010-01-01,80,BBB
2012-02-22,53,BBB
2013-01-13,63,BBB
2015-01-04,34,BBB
2010-01-01,18,CCC
2012-02-22,34,CCC
2013-01-13,55,CCC
2015-01-04,76,CCC
```

![Charts example 5](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(5).png)

For multiline charts, add a third column. Options are the same as for line charts, except you can not choose the color. ¯\\\_(ツ)\_/¯

## Pie chart

**language: `pie-chart`**

```
Letters,Amount
A,28
B,55
C,43
D,91
```

![Charts example 6](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(6).png)

### Options

* `width` (defaults to `400`)
* `height` (defaults to `200`)
* `className` (defaults to `chart`)

## Vegalite

All charts are drawn with [vegalite](https://vega.github.io/vega-lite/). You can use that too.

**language: `vegalite`**

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "width": 400,
  "height": 200,
  "data": {
    "values": [
      {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
      {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal", "axis": {"labelAngle": 0}},
    "y": {"field": "b", "type": "quantitative"}
  }
}
```

![Charts example 7](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(7).png)

For more info about vegalite, try their [online editor](https://vega.github.io/editor/#/examples/vega-lite/bar).

## Vega

Vegalite is based on [vega](https://vega.github.io/vega/).

⚠️ Charts are rendered as static SVG, interactions will be ignored.

**language: `vega`**

```json
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 400,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"category": "A", "amount": 28},
        {"category": "B", "amount": 55},
        {"category": "C", "amount": 43},
        {"category": "D", "amount": 91},
        {"category": "E", "amount": 81},
        {"category": "F", "amount": 53}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "table", "field": "amount"},
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" },
    { "orient": "left", "scale": "yscale" }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "steelblue"}
        }
      }
    }
  ]
}
```

![Charts example 8](https://raw.githubusercontent.com/idris-maps/code-blocks/master/assets/example_charts(8).png)
