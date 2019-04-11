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
    let keys = Object.keys(list[0]),
      i = 0,
      CombinedChart = keys.map((data, index) => {
        if (i === 0) {
          i += 1;
          return (
            <Area
              type="monotone"
              dataKey={data}
              fill="#8884d8"
              stroke="#8884d8"
              key={index}
            />
          );
        }
        if (i === 1) {
          i += 1;
          return <Bar dataKey={data} barSize={20} fill="#413ea0" key={index} />;
        }
        if (i === 2) {
          i = 0;
          return (
            <Line type="monotone" dataKey={data} stroke="#ff7300" key={index} />
          );
        }
        return "";
      });
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
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            {CombinedChart}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
