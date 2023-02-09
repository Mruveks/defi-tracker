export function Formatter(num) {

  var identifiers = ['k', 'M', 'B'];
  var identifierLengthMinusOne = identifiers.length - 1;
  var identifierOffset = -1;
  var isNegative = (num < 0);

  num = Math.abs(num);
  
  while (num >= 1000 && identifierOffset < identifierLengthMinusOne) {
      num /= 1000;
      identifierOffset++;
  }

  return parseFloat((isNegative ? num * -1 : num) + (identifierOffset > -1 ? ' ' : '')).toFixed(2) + identifiers[identifierOffset];
}
