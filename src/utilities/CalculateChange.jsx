export default function CalculateChange({ lastDay, today }) {
  var number = (((lastDay - today) / today) * 100).toFixed(2);
  let style = "";

  if (number > 0) {
    style = "text-green-500 font-mono";
  } else {
    style = "text-red-500 font-mono";
  }

  return <div className={`${style}`}>{number}%</div>;
}
