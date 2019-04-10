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
    let keys = Object.keys(list[0]);
    let UI = keys.map(a => {
      return (
        <Bar
          type="monotone"
          dataKey={a}
          stroke="#8884d8"
          fill="#8884d8"
          key={a}
        />
      );
    });
    console.log(list);
    return (
      <BarChart
        width={1000}
        height={400}
        data={list}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="order_price" />
        <YAxis />
        <Tooltip />
        <Legend />
        {UI}
      </BarChart>
    );
  }
}
