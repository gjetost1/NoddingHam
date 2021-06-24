import React from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

const stats = [
  {
    name: "Volume",
    stat: "71,897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Open Price",
    stat: "58.16%",
    previousStat: "56.14%",
    change: "2.02%",
    changeType: "increase",
  },
  {
    name: "Close Price",
    stat: "24.57%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const DailyDetails = ({ title, stats }) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      {
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>

          <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            {Object.values(stats).map((item) => (
              <div key={item.name} className="px-4 py-5 sm:p-6">
                <dt className="text-base font-normal text-gray-900">
                  {item.name}
                </dt>
                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    Open {item.open}
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      from {item.close} Close
                    </span>
                  </div>

                  <div
                    className={classNames(
                      item.open < item.close
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                      "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                    )}
                  >
                    {item.open < item.close ? (
                      <ArrowSmUpIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowSmDownIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <span className="sr-only">
                      {item.changeType === "increase"
                        ? "Increased"
                        : "Decreased"}{" "}
                      by
                    </span>
                    {item.change}
                  </div>
                </dd>
              </div>
            ))}
          </dl>
          <div></div>
        </div>
      }
    </div>
  );
};

export const HistoricalDetails = ({ ticker }) => {
  const security_data = useSelector((state) => state.stock.security);
  let metrics = [];
  for (let security in security_data) {
    if (security == ticker) metrics = security_data[security];
  }

  let previousFiveDays = [];
  for (let i = metrics.length - 1; i > metrics.length - 6; i--) {
    previousFiveDays.unshift(metrics[i]);
  }
  console.log(previousFiveDays);

  return (
    <>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Open
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Close
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Low
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      High
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previousFiveDays.map((day, i) => {
                    if (i % 2 !== 0) {
                      return (
                        <tr key={i} class="bg-white">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {day.date.slice(0, 16)}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.open}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.close}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.low}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.high}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.volume}
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={i} class="bg-gray-50">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {day.date.slice(0, 16)}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.open}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.close}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.low}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.high}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.volume}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
