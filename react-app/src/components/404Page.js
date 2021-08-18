import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
    const pinkButtonClassName =
  "px-8 py-2 mx-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline";

    return (
        <div style={{height:"100vh", fontFamily:"Reglisse", fontSize:"8vh"}}>
        <div style={{textAlign:"center", marginTop:"20vh" }} className="text-white">
            <p>404 Error</p>
            <p>Sorry, we couldn't find the page you're looking for. </p>
            <p> <NavLink
            to="/"
            exact={true}
            activeClassName="active"
            className={pinkButtonClassName}
          >
            Return Home
          </NavLink></p>
            </div>
    </div>
    )
}

export default NotFound;