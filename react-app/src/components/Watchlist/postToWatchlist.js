import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { addToWatchList } from "../../store/stock";


export default function PostWatchlist({userId, ticker}) {
const dispatch = useDispatch();
const onAdd = (e) => {
    dispatch(addToWatchList(userId, ticker));
};

    return (
        <button
        type="button" id='addbutton'
        className="inline-flex items-center w-0.5 text-xs px-2 py-1 mx-5 border border-pink-500 rounded-md shadow-sm font-medium text-pink-500 bg-white hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline"
        onClick={onAdd}
        >
        + Watchlist
        </button>

    )

}
