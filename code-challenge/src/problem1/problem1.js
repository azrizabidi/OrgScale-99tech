// basic iterative approach
var sum_to_n_a = function (n) {
  let sum = 0

  for (let i = 1; i <= n; i++) {
    sum += i
  }

  return sum
}

// constant-time formula
var sum_to_n_b = function (n) {
  // using Gauss formula: n(n + 1) / 2
  return (n * (n + 1)) / 2
}

// array-based approach using reduce
var sum_to_n_c = function (n) {
  const values = Array.from({ length: n }, (_, i) => i + 1)
  return values.reduce((acc, curr) => acc + curr, 0)
}

// tests
// console.log(sum_to_n_a(5))  
// console.log(sum_to_n_b(10))
// console.log(sum_to_n_c(7)) 