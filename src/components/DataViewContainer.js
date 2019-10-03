import React from "react";
import { ShotChart } from "./ShotChart";
import { CountSlider } from "./CountSlider";
import { Radio, Switch, Row, Col } from "antd";
import _ from "lodash";

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
  state = {
    threshold: 2,
    chartType: 'hexbin',
    showToolTips: true
  };

  changeChartType = e => {
    this.setState({ chartType: e.target.value });
  };

  changeThresh = input => {
    this.setState({
      threshold: input
    });
  };

  switch = () => {
    this.setState({
      showToolTips: !this.state.showToolTips
    });
  };

  render() {
    return (
      <div className="data-view">
        <ShotChart
          playerId={this.props.playerId}
          threshold={this.state.threshold}
          chartType={this.state.chartType}
          showToolTips={this.state.showToolTips}
        />
        <div className="filters">
          {/* Don't show slider for "scatter" */}
          {this.state.chartType === "hexbin" ? (
            <CountSlider changeThresh={_.debounce(this.changeThresh, 200)} />
          ) : null}
          <Row>
            <Col span={12}>
              <RadioGroup
                onChange={this.changeChartType}
                value={this.state.chartType}
              >
                <Radio value="hexbin">Hexbin</Radio>
                <Radio value="scatter">Scatter</Radio>
              </RadioGroup>
            </Col>
            <Col span={6}>
              Tooltip:{" "}
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                defaultChecked
                onChange={this.switch}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
