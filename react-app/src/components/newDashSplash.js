import React from "react";
import { NavLink } from "react-router-dom";
import {colors} from "./Portfolio/index";

export const NewDashSplash = () => {
    const pinkButtonClassName =
  "px-8 py-2 mx-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline";

    return (
        <div style={{height:"100vh", fontFamily:"Reglisse", fontSize:"8vh"}}>
            <div style={{textAlign:"center", marginTop:"5vh" }} className="text-white">
                <p> Welcome to NoddingHam:  </p>
                <p>an ETF Tracker with a lil' extra.</p>
                <p> Click  <NavLink
                to="/portfolio"
                exact={true}
                activeClassName="active"
                className={pinkButtonClassName}
              >
                Portfolio
              </NavLink> to track stocks you own. </p>
                <p> Click   <NavLink
                  to="/watchlist/1"
                  exact={true}
                  activeClassName="active"
                  className={pinkButtonClassName}
                >
                  Watchlist
                </NavLink> to track stocks you're interested in.  </p>
                <p> Search stock tickers for individual stock info.</p>
                </div>
        </div>

    )
}
