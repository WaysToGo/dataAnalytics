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
    let keys = Object.keys(list[0]);
    let UI = keys.map(a => {
      return (
        <Area
          type="monotone"
          dataKey={a}
          stroke="#8884d8"
          fill="#8884d8"
          key={a}
        />
      );
    });
    return (
      <AreaChart
        width={1000}
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
        <XAxis />
        <YAxis />
        <Tooltip />
        {UI}
      </AreaChart>
    );
  }
}
