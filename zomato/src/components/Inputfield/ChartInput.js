import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ChartInput extends React.Component {
  render() {
    const {
      dashboardData,
      addChart,
      removeChart,
      handleChange,
      handleSubmit,
      chartData,
      xaxis,
      yaxis
    } = this.props;
    let fields;
    if (dashboardData) {
      fields = Object.keys(dashboardData[0]);
    }
    let makeItem = (value, index) => {
      return <option key={index}>{value}</option>;
    };
    return (
      <Container>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <Row>
            <Form.Group controlId="xaxis" className="col">
              <Form.Label>X-axis</Form.Label>
              <Form.Control as="select" value={xaxis} name="xaxis">
                {fields.map(makeItem)}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="yaxis" className="col">
              <Form.Label>Y-axis</Form.Label>
              <Form.Control as="select" value={yaxis} name="yaxis">
                {fields.map(makeItem)}
              </Form.Control>
            </Form.Group>
          </Row>

          {chartData.map((val, idx) => {
            let fieldId = `field-${idx}`,
              colorId = `color-${idx}`,
              chartId = `chart-${idx}`;
            return (
              <Row key={idx}>
                <Form.Group controlId={chartId} className="col">
                  <Form.Label>Chart</Form.Label>
                  <Form.Control
                    as="select"
                    value={chartData[idx].chart}
                    name="chart"
                    data-id={idx}
                  >
                    <option>BarChart</option>
                    <option>LineChart</option>
                    <option>AreaChart</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId={fieldId} className="col">
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

                <Form.Group controlId={colorId} className="col">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Color"
                    value={chartData[idx].color}
                    name="color"
                    data-id={idx}
                  />
                </Form.Group>
              </Row>
            );
          })}
          <Row>
            <Col md={{ span: 2, offset: 10 }}>
              <i
                className="far fa-trash-alt   Icon delete-Icon"
                onClick={removeChart}
              />
              <i
                className="far fa-plus-square  pl-4 Icon add-Icon"
                onClick={addChart}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
export default ChartInput;
