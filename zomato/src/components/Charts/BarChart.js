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
    console.log(list);
    return (
      <BarChart
        width={600}
        height={300}
        data={list}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="order_price" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="order_price" fill="#8884d8" />
      </BarChart>
    );
  }
}
