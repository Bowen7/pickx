# pickx
(multiple) random pick with weights

## Usage/Examples

```javascript
pickx(values, options)
// or
pickx(value, weights, options)
```

signle pick
```javascript
pickx([1, 2, 3])
// return [1] or [2] or [3]
```

multiple pick
```javascript
pickx([1, 2, 3], { count: 2 })
```

with weights
```javascript
pickx([1, 2, 3], [1, 2, 1])
pickx([1, 2, 3], [1, 2, 1], { count: 2 })
```

object values
```javascript
pickx({ 1: 1, 2: 2, 3: 3})
pickx({ 1: 1, 2: 2, 3: 3}, { count: 2 })