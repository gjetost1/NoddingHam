import React from "react";

const Loader = () => {
    return (
        <div className='flex' style={{position:"relative", justifyContent:"center", marginTop:"10vh"}}>
            <div style={{position:"absolute"}}>Loading...</div>
        </div>
    );
};

export default Loader;
