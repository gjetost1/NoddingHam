import React from "react";
import logo from './NoddingHamBounce.png'

const Loader = () => {
    return (
        <div class="stage" style={{position:"relative", justifyContent:"center", marginTop:"10vh", fontFamily:"Reglisse", fontSize:"8vh", height:"100vh", width:"100vw"}}>
            <img src={logo} style={{position:"absolute", marginTop:"8vh"}} class="box bounce-6"></img>
            <div  className="text-white" style={{position:"absolute"}}>Loading...</div>
            <p className="text-white" style={{position:"absolute", marginTop:"11vh", fontSize:"4vh"}}>There's a lot of data! Hold tight, we're going as fast as we can!</p>


        </div>

    );
};

export default Loader;
