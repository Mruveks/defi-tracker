export function Formatter(num) {
  var isNegative = num < 0;
  num = Math.abs(num);
  return (isNegative ? "-" : "") + parseFloat(num).toFixed(2);
}
