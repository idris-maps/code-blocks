# `rehype-charts` examples

## bar-chart

**A default bar chart**

```bar-chart
Letters,Amount
A,28
B,55
C,43
D,91
E,81
F,53
G,19
H,81
I,52
```

### options

* `width` (defaults to `400`)
* `height` (defaults to `200`)
* `color` (defaults to `steelblue`)

**A bar chart with all options set**

```bar-chart
---
width: 500
height: 100
color: red
---
Letters,Amount
A,28
B,55
C,43
D,91
E,81
F,53
G,19
H,81
I,52
```

## line-chart

**A default line chart**

```line-chart
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

### options

* `width` (defaults to `400`)
* `height` (defaults to `200`)
* `color` (defaults to `steelblue`)
* `temporal` (defaults to `false`)

If `temporal` is not `true`, the x axis is assumed to be `nominal`, as in the example above. As we are using dates here, set `temporal` to `true`.

**A temporal line chart**

```line-chart
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

## area-chart

**A temporal area chart**

```area-chart
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

Area chart options are the same as for line charts.

## multiline-chart

**A temporal multiline chart**

```multiline-chart
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

For multiline charts, add a third column. Options are the same as for line charts, except you can not choose the color. ¯\\\_(ツ)\_/¯

## pie-chart

**A default pie chart**

```pie-chart
Letters,Amount
A,28
B,55
C,43
D,91
```

### Options

* `width` (defaults to `400`)
* `height` (defaults to `200`)

## vegalite

Charts are drawn with [vegalite](https://vega.github.io/vega-lite/). Try their [online editor](https://vega.github.io/editor/#/examples/vega-lite/bar).

**A vegalite chart**

```vegalite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A simple bar chart with embedded data.",
  "width": 400,
  "height": 200,
  "data": {
    "values": [
      {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
      {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
      {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal", "axis": {"labelAngle": 0}},
    "y": {"field": "b", "type": "quantitative"}
  }
}
```

## vega

Vegalite is based on [vega](https://vega.github.io/vega/). You can use that too.

⚠️ Charts are rendered as static SVG, interactions will be ignored.

**A vega chart**

```vega
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
        {"category": "F", "amount": 53},
        {"category": "G", "amount": 19},
        {"category": "H", "amount": 87}
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


