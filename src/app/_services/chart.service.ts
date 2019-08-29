import { GoogleCharts } from 'google-charts';
import { ChartData } from '../_models/chart-data.model';

export class ChartService {

    static drawGraph(chartData: ChartData) {
        var options = {
            colors: chartData.colors,
            backgroundColor: '#f1f8e9'
        };

        switch (chartData.type) {
            case 'line': var chart = new GoogleCharts.api.visualization.LineChart(chartData.selector); break;
            case 'pie': var chart = new GoogleCharts.api.visualization.PieChart(chartData.selector); break;
            default: alert('wrong type');
        }

        chart.draw(chartData.data, options);
    }



}







    // function drawGraph(data,selector,colors,type) {
    //     var options = {
    //         colors: colors,
    //         backgroundColor: '#f1f8e9'
    //     };

    //     switch (type) {
    //         case 'line':  var chart = new GoogleCharts.api.visualization.LineChart(selector); break;
    //         case 'pie':   var chart = new GoogleCharts.api.visualization.PieChart(selector);
    //         break;
    //         default: alert('wrong type');
    //     }

    //     chart.draw(data, options);
    // }

