import moment from "moment";
import numeral from "numeral";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const formattedLabel = moment(label).format("DD/MM/YYYY");
    const formattedValue = numeral(payload[0].value).format("$0,0");
    return (
      <div className="flex w-full gap-4 lg:text-opacity-5 sm:w-0rem items-base items-baseline text-xl bg-transparent ring-offset-0">
        <p className="flex font-mono text-right">{formattedLabel}</p>
        <div className="flex space-x-2">
          <p className="">Total:</p>

          <p className="italic font-mono font-semibold text-blue-400">{formattedValue}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
