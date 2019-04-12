import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class QueryForm extends React.Component {
  state = {
    chartData: [{ field: "", color: "" }],
    chart: "",
    xaxis: "",
    yaxis: ""
  };

  handleChange = e => {
    console.log(this.state);
    if (["field", "color"].includes(e.target.name)) {
      let chartData = [...this.state.chartData];
      chartData[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ chartData }, () => console.log(this.state.chartData));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addChart = e => {
    this.setState(prevState => ({
      chartData: [...prevState.chartData, { field: "", color: "" }]
    }));
  };
  handleSubmit = e => {
    const { chartData, chart, xaxis, yaxis } = this.state;
    e.preventDefault();
    this.props.updateCustomChartsState(chartData, chart, xaxis, yaxis);
  };
  render() {
    const { chartData, chart, xaxis, yaxis } = this.state;
    const { dashboardData } = this.props;
    let fields;
    if (dashboardData) {
      fields = Object.keys(dashboardData[0]);
    }
    let makeItem = (value, index) => {
      return <option key={index}>{value}</option>;
    };
    return (
      <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <Form.Group controlId="chart">
          <Form.Label>Chart</Form.Label>
          <Form.Control as="select" value={chart} name="chart">
            <option>BarChart</option>
            <option>LineChart</option>
            <option>AreaChart</option>
            <option>Combined</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="xaxis">
          <Form.Label>Xaxis</Form.Label>
          <Form.Control as="select" value={xaxis} name="xaxis">
            {fields.map(makeItem)}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="yaxis">
          <Form.Label>Yaxis</Form.Label>
          <Form.Control as="select" value={yaxis} name="yaxis">
            {fields.map(makeItem)}
          </Form.Control>
        </Form.Group>

        {chartData.map((val, idx) => {
          let fieldId = `field-${idx}`,
            colorId = `color-${idx}`;
          return (
            <div key={idx}>
              <Form.Group controlId={fieldId}>
                <Form.Label>Field</Form.Label>
                <Form.Control
                  as="select"
                  value={chartData[idx].field}
                  name="field"
                  data-id={idx}
                >
                  {fields.map(makeItem)}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId={colorId}>
                <Form.Label>color</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Color"
                  value={chartData[idx].color}
                  name="color"
                  data-id={idx}
                />
              </Form.Group>
            </div>
          );
        })}
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>

        <Button onClick={this.addChart} variant="primary">
          Add
        </Button>
      </Form>
    );
  }
}
export default QueryForm;
