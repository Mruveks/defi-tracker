export function UnixConverter(date) {

  const unixTimestamp = date;

  const milliseconds = (unixTimestamp * 1000);

  const dateObject = new Date(milliseconds)

  let dates = dateObject.toLocaleString()


  if (dateObject.length === 19) {
    dates = dates.slice(0, 9)
  } else {
    dates = dates.slice(0, 10)
  }
  

  return dates;
}