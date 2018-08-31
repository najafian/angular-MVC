import {BaseWidget} from "./base.widget";
import {Guid} from "../../../services/GUIDService";


export class ChartWidget extends BaseWidget {
    public widget: ej.datavisualization.Chart | undefined;
    public widgetID!: string;
    public dashboardID!: string;
    public random!: number;

    createWidget(): void {
        let that: any = this;
        let shape:any;
        let type:any;
        this.random = parseInt(Guid.newNumber()) % 9;
        switch (this.random) {
            case 1:
                type=ej.datavisualization.Chart.Type.Column;
                shape=ej.datavisualization.Chart.Shape.Circle;
                break;
            case 2:
                type=ej.datavisualization.Chart.Type.Line;
                shape=ej.datavisualization.Chart.Shape.Cross;
                break;
            case 3:
                type=ej.datavisualization.Chart.Type.Area;
                shape=ej.datavisualization.Chart.Shape.Diamond;
                break;
            case 4:
                type=ej.datavisualization.Chart.Type.Bar;
                shape=ej.datavisualization.Chart.Shape.DownArrow;
                break;
            case 5:
                type=ej.datavisualization.Chart.Type.Candle;
                shape=ej.datavisualization.Chart.Shape.Ellipse;
                break;
            case 6:
                type=ej.datavisualization.Chart.Type.Funnel;
                shape=ej.datavisualization.Chart.Shape.Hexagon;
                break;
            case 7:
                type=ej.datavisualization.Chart.Type.Doughnut;
                shape=ej.datavisualization.Chart.Shape.HorizLine;
                break;
            case 8:
                type=ej.datavisualization.Chart.Type.Pie;
                shape=ej.datavisualization.Chart.Shape.Star;
                break;
            case 9:
                type=ej.datavisualization.Chart.Type.RangeColumn;
                shape=ej.datavisualization.Chart.Shape.Cross;
                break;
        }
        that.widget = new ej.datavisualization.Chart($('#' + this.widgetID), {
            primaryXAxis:
                {
                    range: {min: 2005, max: 2012, interval: 1},
                    title: {text: 'Year'}
                },

            //Initializing Primary Y Axis
            primaryYAxis:
                {
                    title: {text: 'Intensity (g/kWh)'},
                    range: {min: 360, max: 600, interval: 30}
                },

            //Initializing Common Properties for all the series
            commonSeriesOptions:
                {
                    type: type,
                    enableAnimation: true,
                    marker:
                        {
                            shape: shape,
                            // size:
                            //     {
                            //         height: 12, width: 12
                            //     },
                            visible: true
                        },
                    border: {width: 2},
                    tooltip:
                        {
                            visible: true,
                            format: "#series.name# <br/> #point.x# : #point.y#  (g/kWh)"
                        }
                },

            //Initializing Series
            series:
                [
                    {
                        points: [{x: 2006, y: 378}, {x: 2007, y: 416}, {x: 2008, y: 404}, {x: 2009, y: 390},
                            {x: 2010, y: 376}, {x: 2011, y: 365}],
                        name: 'USA'
                    },
                    {
                        points: [{x: 2006, y: 463}, {x: 2007, y: 449}, {x: 2008, y: 458}, {x: 2009, y: 450},
                            {x: 2010, y: 425}, {x: 2011, y: 430}],
                        name: 'UK'
                    },
                    {
                        points: [{x: 2006, y: 519}, {x: 2007, y: 508}, {x: 2008, y: 502}, {x: 2009, y: 495},
                            {x: 2010, y: 485}, {x: 2011, y: 470}],
                        name: 'Korea'
                    },
                    {
                        points: [{x: 2006, y: 570}, {x: 2007, y: 579}, {x: 2008, y: 563}, {x: 2009, y: 550},
                            {x: 2010, y: 545}, {x: 2011, y: 525}],
                        name: 'Japan'
                    }
                ],
            isResponsive: true,
            title: {text: 'CO2 - Intensity Analysis'},
            size: {width: '100%', height: '100%'},
            legend: {visible: true}
        });
    }


    constructor() {
        super();

    }

    init(containerID: string) {
        let widgetEl = document.createElement('div');
        widgetEl.setAttribute('style', 'direction:initial;height:100%;width:100%;');
        this.rootEl.setAttribute('class', 'grid-stack-item-content');
        this.rootEl.appendChild(widgetEl);
        this.widgetID = this.getNewID();
        widgetEl.setAttribute('id', this.widgetID);
        $('#' + containerID).append(this.rootEl);
    }

    getValues(): any {
        let series1 = [];
        let value = 100;
        for (let i = 1; i < 250; i++) {
            if (Math.random() > .5) {
                value += Math.random();
            } else {
                value -= Math.random();
            }
            let point = {XValue: new Date(1970, i + 2, i), YValue: value};
            series1.push(point);
        }
        return {Open: series1};
    }

    setValues(values: any) {
    }

    public redraw(): void {
        if (this.widget!=undefined) 
        this.widget.redraw()
    }
}