import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Chart extends Component {
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
        return (
          <Bar
            type="monotone"
            dataKey={data.field}
            stroke={data.color}
            fill={data.color}
            key={i}
          />
        );
      });
    }
    return (
      <BarChart
        width={900}
        height={400}
        data={list}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xaxis} />
        <YAxis dataKey={yaxis} />
        <Tooltip />
        <Legend />
        {DynamicBars}
      </BarChart>
    );
  }
}
