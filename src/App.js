import React from 'react';
import chartXkcd from 'chart.xkcd';
import { Line } from "chart.xkcd-react";
import './App.css';
import ReactDataSheet from 'react-datasheet';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zero: true,
            grid: [
                [{value:  "Monthly income of an indie developer"}, {value:  "$ Dollors"}, ],
                [{value:  "Month"}, {value:  "January"}, {value:  "February"},{value:  "March"},{value:  "April"},{value:  "June"}, {value:  "July"}, {value:  "August"},{value:  "September"},{value:  "October"},{value: "November"},{value: "December"} ],
                [{value:  "Plan"}, {value:  1}, {value:  3},{value:  30},{value:  37},{value:  45},{value:  63}, {value:  110}, {value:  223},{value:  310},{value:  433},{value:  1003} ],
                [{value:  "Reality"},{value:  2}, {value:  4},{value:  3},{value:  3},{value:  3},{value:  3},{value:  2}, {value:  4},{value:  3},{value:  3},{value:  10}]
            ]
        };
    }

    getRow(rowIndex) {
        return this.state.grid[rowIndex].map(item => item.value);
    }

    getRowHead(rowIndex) {
        return this.getRow(rowIndex)[0];
    }
    getRowSecond(rowIndex) {
        return this.getRow(rowIndex)[1];
    }
    getRowTail(rowIndex) {
        return this.getRow(rowIndex).slice(1);
    }

    getData() {
        return {
            labels: this.getRowTail(1),
            datasets: [{
                label: this.getRowHead(2),
                data: this.getRowTail(2),
            }, {
                label: this.getRowHead(3),
                data: this.getRowTail(3),
            }],
        };
    }

    render() {
        return (
            <div>
                <div className={'sheet-container'}>
                <Line
                config={{
                    title: this.getRowHead(0), // optional
                    xLabel: this.getRowHead(1), // optional
                    yLabel: this.getRowSecond(0), // optional
                    data: this.getData(),
                    options: { // optional
                        yTickCount: 3,
                        legendPosition: chartXkcd.config.positionType.upLeft
                    }
                }}
                />
                </div>
                <div className={'sheet-container'}>
                <ReactDataSheet
                    data={this.state.grid}
                    valueRenderer={(cell) => cell.value}
                    onCellsChanged={changes => {
                        const grid = this.state.grid.map(row => [...row]);
                        changes.forEach(({cell, row, col, value}) => {
                            grid[row][col] = {...grid[row][col], value};
                        });
                        this.setState({zero:false, grid:grid});
                    }}
                />
                </div>
            </div>
        );
    }
}

export default App;
