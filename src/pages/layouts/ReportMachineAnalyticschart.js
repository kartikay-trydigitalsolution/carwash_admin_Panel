import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";

const ReportMachineAnalyticschart = (mixData) => {
  const data = [
    {
      x: `Completed`,
      y: mixData?.mixData?.completedTasks,
    }, // Purple
    {
      x: `Pending`,
      y: mixData?.mixData?.pendingTasks,
    }, // Blue
    {
      x: `Averagetime`,
      y: mixData?.mixData?.averageTimePerTask,
    }, // Orange
    {
      x: `Technician per`,
      y: mixData?.mixData?.technicianPerformance,
    }, // Green
  ];
  const labels = [
    "Completed tasks",
    "Pending tasks",
    "Average time per task",
    "Technician performance",
  ];
  const values = [
    mixData?.mixData?.completedTasks,
    mixData?.mixData?.pendingTasks,
    mixData?.mixData?.averageTimePerTask,
    mixData?.mixData?.technicianPerformance,
  ];
  const colors = ["#B46FFF", "#3A78F2", "#F2994A", "#27AE60"];

  return (
    <div>
      <h3 className="ps-3 pe-3">Maintenance Reports</h3>
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

export default ReportMachineAnalyticschart;
