import moment from "moment";
import numeral from "numeral";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const formattedLabel = moment(label).format("DD/MM/YYYY");
    const formattedValue = numeral(payload[0].value).format("$0,0");
    return (
      <div className="bg-transparent text-2xl outline-none p-1 ring-0 border border-none">
        <p className="sm:hidden">Total TVL</p>
        <p className="text-xl italic font-semibold">{formattedValue}</p>
        <p className="text-base font-semibold">{formattedLabel}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;