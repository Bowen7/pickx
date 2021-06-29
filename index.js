const quickselect = require('quickselect')

const pickWithoutWeight = (values, options) => {
  const { random = Math.random, count = 1 } = options
  const length = values.length

  const result = []
  for (let i = 0; i < count; i++) {
    const rand = Math.floor(random() * (length - i) + i)
    result.push(values[rand])

    const tmp = values[rand]
    values[rand] = values[i]
    values[i] = tmp
  }
  return result
}

const pickWithWeight = (values, weights, options) => {
  const { random = Math.random, count = 1 } = options

  // https://stackoverflow.com/questions/2140787/select-k-random-elements-from-a-list-whose-elements-have-weights
  const result = values.map((value, index) => {
    const weight = weights[index]
    return {
      value,
      weight: -Math.log(random()) / weight,
    }
  })

  quickselect(
    result,
    count,
    0,
    result.length - 1,
    (a, b) => a.weight - b.weight
  )
  return result.slice(0, count).map((item) => item.value)
  // let sum = weights.reduce((prev, weight) => prev + weight, 0)
  // const weightMap = new Map()
  // values.forEach((value, index) => {
  //   weightMap.set(value, weights[index])
  // })
  // for (let i = 0; i < count; i++) {
  //   let rand = random() * sum
  //   for (const [value, weight] of weightMap) {
  //     if (weight > rand) {
  //       result.push(value)
  //       sum -= weight
  //       weightMap.delete(value)
  //       break
  //     }
  //     rand -= weight
  //   }
  // }
}

const pickx = (values, weights, options = {}) => {
  if ({}.toString.call(weights) === '[object Object]') {
    options = weights
    weights = null
  }

  if (!weights && {}.toString.call(values) === '[object Object]') {
    const _values = []
    weights = []
    Object.keys(values).forEach((key) => {
      _values.push(key)
      weights.push(values[key])
    })
  }

  if (weights) {
    if (weights.some((weight) => !(typeof weight === 'number' && weight > 0))) {
      return console.error('weight should be a number')
    }
    if (weights.length !== values.length) {
      return console.error("values don't match weights")
    }
  }

  const { count = 1 } = options
  if (count >= values.length) {
    return values
  }
  if (!weights) {
    return pickWithoutWeight(values, options)
  }
  return pickWithWeight(values, weights, options)
}

module.exports = pickx
