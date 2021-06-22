import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboard } from "../../store/stock";
import Lines from "../Charts/Lines";
function Portfolio() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const stocks = useSelector((state) => state.stock.dashboard);
  // use effect
  useEffect(() => {
    async function getDashboard() {
      const data = await dispatch(dashboard());
      setLoaded(true);
      return data;
    }
    getDashboard();
  }, [loaded]);

  console.log(`here comes the dashboard`, stocks);
  if (loaded) {
    return (
      <div style={{ paddingRight: "25%", paddingLeft: "25%" }}>
        <div style={{ height: "600px", width: "600px" }}>
          <Lines data={stocks} />
        </div>
      </div>
    );
  }
  if (!loaded) return <h1>Loading</h1>;
}

export default Portfolio;
