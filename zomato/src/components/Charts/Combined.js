import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [...this.props.dashboardData]
    };
  }

  render() {
    const { list } = this.state;
    const { xaxis, yaxis, chartData } = this.props;
    let DynamicBars = [];
    if (chartData) {
      DynamicBars = chartData.map((data, i) => {
        switch (data.chart) {
          case "AreaChart":
            return (
              <Area
                type="monotone"
                dataKey={data.field}
                stroke={data.color}
                fill={data.color}
                key={i}
              />
            );

          case "BarChart":
            return (
              <Bar
                type="monotone"
                dataKey={data.field}
                stroke={data.color}
                fill={data.color}
                key={i}
              />
            );

          case "LineChart":
            return (
              <Line
                type="monotone"
                dataKey={data.field}
                stroke={data.color}
                fill={data.color}
                key={i}
              />
            );
          default:
            break;
        }
      });
    }

    return (
      <div style={{ width: "90%", height: 400 }} className="mb-4">
        <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={400}
            data={list}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={xaxis} />
            <YAxis dataKey={yaxis} />
            <Tooltip />
            <Legend />
            {DynamicBars}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
