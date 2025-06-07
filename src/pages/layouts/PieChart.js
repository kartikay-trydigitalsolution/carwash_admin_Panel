import React from "react";
import { VictoryPie, VictoryLegend } from "victory";

const ClientsPieChart = () => {
  //   const data = [
  //     { x: "Under Pending", y: 10 },
  //     { x: "Serviced", y: 15 },
  //     { x: "New", y: 50 },
  //     { x: "Total", y: 12 },
  //   ];

  const colors = ["#C084FC", "#2563EB", "#F97316", "#22C55E"];

  const labels = [
    "Under Pending Clients",
    "Service Overed Clients",
    "New Clients",
    "Total Clients",
  ];

  const values = [10, 15, 50, 12];

  return (
    <div>
      <h3 className="ps-3 pe-3">Clients</h3>

      {/* <VictoryPie
        width={250} // Adjust width as needed
        height={130} // Decreased height to match bar chart card size
        innerRadius={1}
        colorScale={["#C084FC", "#2563EB", "#F97316", "#22C55E"]}
        data={[
          { x: "Pending", y: 10 },
          { x: "Serviced", y: 15 },
          { x: "New", y: 50 },
          { x: "Total", y: 12 },
        ]}
        labels={() => null}
        style={{
          data: { stroke: "#fff", strokeWidth: 1 },
        }}
      /> */}
      {/* <VictoryPie
        width={200} // Slightly wider to balance proportions
        height={200} // Reduced height to fit card height like the bar charts
        innerRadius={0.1} // Optional: makes it look like a donut
        colorScale={["#C084FC", "#2563EB", "#F97316", "#22C55E"]}
        data={[
          { x: "Pending", y: 10 },
          { x: "Serviced", y: 15 },
          { x: "New", y: 50 },
          { x: "Total", y: 12 },
        ]}
        labels={() => null}
        style={{
          data: { stroke: "#fff", strokeWidth: 1 },
        }}
      /> */}
      <VictoryPie
        // data={data}
        colorScale={colors}
        height={270}
        innerRadius={0.1}
        style={{
          labels: { fontSize: 10, fill: "#333" },
          data: { stroke: "#fff", strokeWidth: 1 },
        }}
      />

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

export default ClientsPieChart;
