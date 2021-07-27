import React from "react";

const Loader = () => {
    return (
        <div className='flex' style={{position:"relative", justifyContent:"center", marginTop:"10vh", fontFamily:"Reglisse", fontSize:"8vh", height:"100vh", width:"100vw"}}>
            <div  className="text-white" style={{position:"absolute"}}>Loading...</div>

        </div>
    );
};

export default Loader;
