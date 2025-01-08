// Time Complexity: O(n) - The function iterates from 1 to n, performing a constant time addition in each iteration.
// Space Complexity: O(1) - The function uses a constant amount of extra space regardless of the input size.
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Time Complexity: O(1) - The function performs a constant number of operations regardless of the input size.
// Space Complexity: O(1) - The function uses a constant amount of extra space regardless of the input size.
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

// Time Complexity: O(n) - The function makes a recursive call for each integer from n down to 1.
// Space Complexity: O(n) - The function uses additional space on the call stack proportional to the input size due to the recursive calls.
function sum_to_n_c(n: number): number {
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
}