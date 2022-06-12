import moment from "moment";
import { ClockIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

function Time() {
  const time = moment();

  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const data = new Date().toLocaleTimeString();
      setClock(data);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-row gap-x-2 items-center">
      <ClockIcon className="w-11  stroke-slate-900 stroke-1" />

      <div className="flex flex-col items-start w-32">
        <p className="uppercase font-bold text-xl text-gray-700 flex">
          <span className="pr-1">{clock}</span> <span>{time.format("a")}</span>
        </p>
        <small className="text-gray-600 ">
          {time.format("ddd,  DD/MM/YY")}
        </small>
      </div>
    </div>
  );
}

export default Time;
