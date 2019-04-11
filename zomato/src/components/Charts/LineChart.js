import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
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
    let keys = Object.keys(list[0]);
    let DynamicLines = keys.map((data, i) => {
      return (
        <Line
          type="monotone"
          dataKey={data}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          key={i}
        />
      );
    });
    return (
      <LineChart
        width={900}
        height={400}
        data={list}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        {DynamicLines}
      </LineChart>
    );
  }
}
