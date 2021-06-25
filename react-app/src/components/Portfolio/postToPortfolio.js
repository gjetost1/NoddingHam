import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { addToPortfolio } from "../../store/stock";


export default function PostPortfolio({userId, ticker}) {
const dispatch = useDispatch();
const onAdd = (e) => {
    dispatch(addToPortfolio(userId, ticker));
};

    return (
        <button
        type="button" id='addbutton'
        className="inline-flex items-center w-0.5 text-xs px-2 py-1 mx-5 mt-8 border border-pink-500 rounded-md shadow-sm font-medium text-pink-500 bg-white hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline"
        onClick={onAdd}
        >
        + Portfolio
        </button>

    )

}
