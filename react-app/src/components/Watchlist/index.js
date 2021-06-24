import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualSecurity, getWatchlist, addWatchList } from "../../store/stock";
import { useParams } from "react-router";
import Lines from "../Charts/Lines";
import DeleteFromWatchlist from "./deleteFromWatchlist";


import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'

// websocket fetch here
const stats = [
  { name: 'Volume', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: 'Open Price', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: 'Close Price', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Watchlist() {
  const {userId} = useParams()
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [deleted, setDeleted] = useState(false);



  useEffect(() => {
      (async function() {
        const newData = await dispatch(getWatchlist(userId))
        let dataArray = []

        for (let [ticker, points] of Object.entries(newData)) {
          let nextSecurity = {}
          nextSecurity["id"] = ticker
          const color = Math.floor(Math.random() * 255)
          nextSecurity["color"] = `hsl(${color}, 70%, 50%)`
          nextSecurity["data"] = []
          points.forEach(point => nextSecurity["data"] = nextSecurity["data"].concat({"x": point.date, "y": point.close}))

          //multi chart
          dataArray = [...dataArray, [nextSecurity]]
          //single chart
          // dataArray = [...dataArray, nextSecurity]
        }
        setData(dataArray)
        setIsLoaded(true)
      })();
  },[])

  const removeSecurity = e => {
    let security = e.target.parentNode.parentNode
    security.setAttribute("hidden", true)


  }
  return isLoaded && (

    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{
        <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">DYNAMIC STOCK</h3>

        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
                </div>

                <div
                className={classNames(
                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                    )}
                    >
                {item.changeType === 'increase' ? (
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

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}

                </div>
            </dd>
            </div>
        ))}
        </dl>
        <div style={{height: "500px", width: "1000px"}}>

            { data.map((security, i) => {

             return <div className="watchlist-security" key={i}>
              <div onClick={removeSecurity}>

              <DeleteFromWatchlist userId={userId} ticker={security[0].id}/>
              </div>

             <Lines data={security[0]} /> </div>})}


        </div>

    </div>

    }
  </div>
)
}
