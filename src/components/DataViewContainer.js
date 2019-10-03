import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';
import { Radio, Switch, Row, Col } from 'antd';
import _ from 'lodash';

const RadioGroup= Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        threshold: 2,
        value: 1,
        chartType: ['hexbin', 'scatter'],
        showToolTips: true   
    }

    changeChartType = (e) => {
        this.setState({ value: e.target.value});
    };


    changeThresh = (input) => {
        this.setState({
            threshold: input
        });
    }

    switch = () => {
        this.setState({
            showToolTips: !this.state.showToolTips
        })
    }

    render() {
        const whichChartType = this.state.chartType[this.state.value-1];
        return (
            <div className='data-view'>
                <ShotChart 
                    playerId={this.props.playerId} 
                    threshold={this.state.threshold}
                    chartType={whichChartType}
                    showToolTips={this.state.showToolTips}
                />
                <div className="filters">
                    
                    {/* Don't show slider for "scatter" */}
                    {whichChartType === 'hexbin' ?
                        <CountSlider changeThresh={_.debounce(this.changeThresh, 200)} /> : null}
                    <Row>
                        <Col span={12}>
                            <RadioGroup onChange={this.changeChartType} value={this.state.value}>
                                <Radio value={1}>Hexbin</Radio>
                                <Radio value={2}>Scatter</Radio>
                            </RadioGroup>   
                        </Col>
                        <Col span={4}>   
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
        )
    }
}