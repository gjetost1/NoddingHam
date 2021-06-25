import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { deleteFromPortfolio } from "../../store/stock";


export default function DeleteFromPortfolio({userId, ticker}) {
const dispatch = useDispatch();
const onClick = (e) => {
    dispatch(deleteFromPortfolio(userId, ticker));
};


    return (
        <button
        type="button" id='addbutton'
        className="inline-flex items-center w-0.5 text-xs px-2 py-1 mx-5 mt-8 border border-transparent rounded-md shadow-sm font-medium text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline"
        onClick={onClick}
        >
        - Portfolio
        </button>

    )

}
