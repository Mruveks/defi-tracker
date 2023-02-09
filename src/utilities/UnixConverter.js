export function UnixConverter(date) {

  const unixTimestamp = date;

  const milliseconds = (unixTimestamp * 1000);

  const dateObject = new Date(milliseconds)
  
  let dates = dateObject.toLocaleString()
console.log(dates)

  if (dates.length === 20) {
    dates = dates.slice(0, 10)
  } else {
    dates = dates.slice(0, 9)
  }
  

  return dates;
}