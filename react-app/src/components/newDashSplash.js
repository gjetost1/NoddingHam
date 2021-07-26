import React from "react";
import {colors} from "./Portfolio/index";

export const NewDashSplash = () => {

    return (
        <div style={{height:"100vh", fontFamily:"Reglisse", fontSize:"8vh"}}>
            <div style={{textAlign:"center", marginTop:"5vh" }} className="text-white">
                <p> Welcome to NoddingHam, an ETF Tracker with a lil' extra.</p>
                <p> Click Portfolio to track stocks you own. </p>
                <p> Click Watchlist to track stocks you're interested in.  </p>
                <p> Search stock tickers to analyze for individual stock info.</p>
                </div>
        </div>

    )
}
