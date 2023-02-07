export function Formatter(num) {

  const digits = 2;

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "" },
    { value: 1e6, symbol: "" },
    { value: 1e9, symbol: "" },
    { value: 1e12, symbol: "" },
    { value: 1e15, symbol: "" },
    { value: 1e18, symbol: "" }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
    
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
