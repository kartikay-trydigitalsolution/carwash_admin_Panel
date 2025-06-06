import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLegend,
  VictoryTheme,
} from "victory";

const MachineAnalyticsChart = () => {
  const data = [
    { x: "Machines", y: 10 }, // Purple
    { x: "Completed", y: 15 }, // Blue
    { x: "Alerts", y: 50 }, // Orange
    { x: "Overdue", y: 12 }, // Green
  ];
  const labels = [
    "Under Pending Clients",
    "Service Overed Clients",
    "New Clients",
    "Total Clients",
  ];
  const values = [10, 15, 50, 12];
  const colors = ["#B46FFF", "#3A78F2", "#F2994A", "#27AE60"];

  return (
    <div >
      <h3 className="ps-3 pe-3">Machine Analytics</h3>
      <VictoryChart
        domainPadding={30}
        theme={VictoryTheme.material}
        height={250}
      >
        <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
        <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10 } }} />

        <VictoryBar
          data={data}
          style={{
            data: {
              fill: ({ index }) => colors[index],
              width: 30,
              borderRadius: 4,
            },
          }}
        />

        {/* <VictoryLegend
          x={50}
          y={200}
          orientation="horizontal"
          gutter={100}
          itemsPerRow={2}
          data={[
            {
              name: "Total Machines in Operation",
              symbol: { fill: colors[0] },
            },
            {
              name: "Completed Maintenance Activities",
              symbol: { fill: colors[1] },
            },
            { name: "Maintenance Alerts", symbol: { fill: colors[2] } },
            { name: "Total Machine Overdue", symbol: { fill: colors[3] } },
          ]}
          style={{ labels: { fontSize: 8 } }}
        /> */}
      </VictoryChart>

      <div style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
        {labels.map((label, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
              fontSize: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: colors[i],
                }}
              ></span>
              {label}
            </div>
            <span>{values[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineAnalyticsChart;
