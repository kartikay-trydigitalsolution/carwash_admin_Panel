import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";

const Inventorychart = (mixData) => {
  console.log(mixData, "akrti");
  const data = [
    {
      x: `Usage `,
      y: mixData?.mixData?.averageUsagePercentage,
    }, // Purple
    {
      x: `Stock`,
      y: mixData?.mixData?.totalInventoryItems,
    }, // Blue
    {
      x: `Cycles`,
      y: mixData?.mixData?.replenishmentCycles,
    }, // Orange
    {
      x: `Overdue`,
      y: mixData?.mixData?.totalMachineOverdue,
    }, // Green
  ];
  const labels = [
    "Usage trends",
    "Stock history",
    "Replenishment cycles",
    "Total Machine Overdue",
  ];
  const values = [
    mixData?.mixData?.averageUsagePercentage,
    mixData?.mixData?.totalInventoryItems,
    mixData?.mixData?.replenishmentCycles,
    mixData?.mixData?.totalMachineOverdue,
  ];
  const colors = ["#B46FFF", "#3A78F2", "#F2994A", "#27AE60"];

  return (
    <div>
      <h3 className="ps-3 pe-3">Inventory Reports</h3>
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

export default Inventorychart;
