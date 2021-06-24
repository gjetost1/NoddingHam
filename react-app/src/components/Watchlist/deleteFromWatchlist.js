import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { deleteFromWatchList } from "../../store/stock";


export default function DeleteFromWatchlist({userId, ticker}) {
const dispatch = useDispatch();
const onClick = (e) => {
    dispatch(deleteFromWatchList(userId, ticker));
};


    return (
        <button
        type="button" id='addbutton'
        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onClick}
        >
        - Watchlist
        </button>

    )

}
