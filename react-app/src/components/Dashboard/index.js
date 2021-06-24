import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PostWatchlist from '../Watchlist/postToWatchlist';
import PostPortfolio from '../Portfolio/postToPortfolio';


const Dashboard = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    useEffect(() => {
        (async function() {

        })();
    })

    // cool graph
    // top 3 securities by market cap
    // ticker -- chart -- price on top of days change
    return (
        <div>Dashboard</div>
    );
}

export default Dashboard;
