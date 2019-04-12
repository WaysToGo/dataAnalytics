import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
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
    let Dynamic = [];
    if (chartData) {
      Dynamic = chartData.map((data, i) => {
        return (
          <Area
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
      <AreaChart
        width={900}
        height={400}
        data={list}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xaxis} />
        <YAxis dataKey={yaxis} />
        <Tooltip />
        {Dynamic}
      </AreaChart>
    );
  }
}
