import React from "react";
import { ResponsiveLine } from "@nivo/line";

// id = ticker name
// data {x: day, y: price}

// apple:

//[{id: ticker
//color: color
// data [{x: day, y:price }]

// color: "hsl(183, 70%, 50%)",
// color: "hsl(352, 70%, 50%)",
// color: "hsl(38, 70%, 50%)",

// const staticData = [
//   {
//     id: "japan",
//     color: "hsl(183, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 97,
//       },
//       {
//         x: "helicopter",
//         y: 280,
//       },
//       {
//         x: "boat",
//         y: 125,
//       },
//       {
//         x: "train",
//         y: 95,
//       },
//       {
//         x: "subway",
//         y: 154,
//       },
//       {
//         x: "bus",
//         y: 141,
//       },
//       {
//         x: "car",
//         y: 117,
//       },
//       {
//         x: "moto",
//         y: 85,
//       },
//       {
//         x: "bicycle",
//         y: 4,
//       },
//       {
//         x: "horse",
//         y: 87,
//       },
//       {
//         x: "skateboard",
//         y: 170,
//       },
//       {
//         x: "others",
//         y: 70,
//       },
//     ],
//   },
//   {
//     id: "france",
//     color: "hsl(352, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 93,
//       },
//       {
//         x: "helicopter",
//         y: 129,
//       },
//       {
//         x: "boat",
//         y: 165,
//       },
//       {
//         x: "train",
//         y: 101,
//       },
//       {
//         x: "subway",
//         y: 121,
//       },
//       {
//         x: "bus",
//         y: 56,
//       },
//       {
//         x: "car",
//         y: 156,
//       },
//       {
//         x: "moto",
//         y: 159,
//       },
//       {
//         x: "bicycle",
//         y: 14,
//       },
//       {
//         x: "horse",
//         y: 115,
//       },
//       {
//         x: "skateboard",
//         y: 223,
//       },
//       {
//         x: "others",
//         y: 211,
//       },
//     ],
//   },
//   {
//     id: "us",
//     color: "hsl(38, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 205,
//       },
//       {
//         x: "helicopter",
//         y: 198,
//       },
//       {
//         x: "boat",
//         y: 129,
//       },
//       {
//         x: "train",
//         y: 105,
//       },
//       {
//         x: "subway",
//         y: 45,
//       },
//       {
//         x: "bus",
//         y: 14,
//       },
//       {
//         x: "car",
//         y: 142,
//       },
//       {
//         x: "moto",
//         y: 7,
//       },
//       {
//         x: "bicycle",
//         y: 228,
//       },
//       {
//         x: "horse",
//         y: 180,
//       },
//       {
//         x: "skateboard",
//         y: 10,
//       },
//       {
//         x: "others",
//         y: 102,
//       },
//     ],
//   },
//   {
//     id: "germany",
//     color: "hsl(239, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 71,
//       },
//       {
//         x: "helicopter",
//         y: 21,
//       },
//       {
//         x: "boat",
//         y: 60,
//       },
//       {
//         x: "train",
//         y: 174,
//       },
//       {
//         x: "subway",
//         y: 226,
//       },
//       {
//         x: "bus",
//         y: 284,
//       },
//       {
//         x: "car",
//         y: 109,
//       },
//       {
//         x: "moto",
//         y: 274,
//       },
//       {
//         x: "bicycle",
//         y: 167,
//       },
//       {
//         x: "horse",
//         y: 39,
//       },
//       {
//         x: "skateboard",
//         y: 127,
//       },
//       {
//         x: "others",
//         y: 278,
//       },
//     ],
//   },
//   {
//     id: "norway",
//     color: "hsl(65, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 104,
//       },
//       {
//         x: "helicopter",
//         y: 266,
//       },
//       {
//         x: "boat",
//         y: 49,
//       },
//       {
//         x: "train",
//         y: 185,
//       },
//       {
//         x: "subway",
//         y: 44,
//       },
//       {
//         x: "bus",
//         y: 68,
//       },
//       {
//         x: "car",
//         y: 287,
//       },
//       {
//         x: "moto",
//         y: 90,
//       },
//       {
//         x: "bicycle",
//         y: 220,
//       },
//       {
//         x: "horse",
//         y: 195,
//       },
//       {
//         x: "skateboard",
//         y: 122,
//       },
//       {
//         x: "others",
//         y: 24,
//       },
//     ],
//   },
// ];

function Lines({ data }) {

  return (
    <>
    <ResponsiveLine
      data={data}
      colors={"hsl(306, 68%, 57%)"}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 1,
        tickPadding: 100,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 20,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Close Price",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={1}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: 20,
          translateY: -20,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 40,
          itemHeight: 10,
          itemOpacity: 0.75,
          symbolSize: 20,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    </>
  );
}

export default Lines;
