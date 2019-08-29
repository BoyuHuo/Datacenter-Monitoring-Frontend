import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { UserService } from '../../../../auth/_services';
import { STATUS, STEP } from '../../../../_models/status';
import { Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { PrometheusService } from '../../../../auth/_services';


import { GoogleCharts } from 'google-charts';
import { ChartData } from '../../../../_models/chart-data.model';
import { ChartService } from '../../../../_services/chart.service';
import { Http } from '@angular/http';
import { resolve } from 'q';
import { promise } from 'selenium-webdriver';
import { httpFactory } from '@angular/http/src/http_module';



@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper.task__coming",
    templateUrl: "./dashboard.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

    ledgers: number = 0;
    workers: number = 0;
    account: string;
    histories = [];
    tasks: boolean = false;
    p: number = 1;
    runnings = [];
    runningTasks = false;
    isEmptyUrl: boolean[] = [];
    iframeUrl: object = {
        overallCPUUrl: '',
        avgCPUUrl: '',
        avgGPUUrl: '',
        diskIOUrl: '',
        networkIOUrl: '',
        NodeListUrl: '',
    }


    // scanUrl = environment.scanUrl;
    private token = localStorage.getItem('token');
    test: string;

    OverallMonitorData = {
        "CpuData": 1,
        "GpuData": 1,
        "DiskData": 1,
        "NetworkData": 1
    }

    constructor(private _script: ScriptLoaderService, private userService: UserService, private router: Router, private http: HttpClient, private __prometheusService: PrometheusService) {

    }
    ngOnInit() {

        this.iframeUrl['overallCPUUrl'] = environment.grafanaOverallPanelUrl + "?orgId=1&from=now-15m&to=now&panelId=8";
        this.iframeUrl['avgCPUUrl'] = environment.grafanaOverallPanelUrl + "?orgId=1&from=now-15m&to=now&panelId=8";
        this.iframeUrl['avgGPUUrl'] = environment.grafanaOverallPanelUrl + "?orgId=1&from=now-15m&to=now&panelId=14";
        this.iframeUrl['diskIOUrl'] = environment.grafanaOverallPanelUrl + "?orgId=1&from=now-15m&to=now&panelId=10";
        this.iframeUrl['networkIOUrl'] = environment.grafanaOverallPanelUrl + "?orgId=1&from=now-15m&to=now&panelId=12";
        this.iframeUrl['NodeListUrl'] = environment.grafanaNodelistUrl + "?orgId=1&from=now&to=now&panelId=2";


        this.__prometheusService.getCPUOverallInfo().subscribe(res => {
            console.log(res['data'].result[0].value[1])
            this.OverallMonitorData.CpuData = res['data'].result[0].value[1];
        })
        this.__prometheusService.getGPUOverallInfo().subscribe(res => {
            console.log(res['data'].result[0].value[1])
            this.OverallMonitorData.GpuData = res['data'].result[0].value[1];
        })
        this.__prometheusService.getDiskOverallInfo().subscribe(res => {
            console.log(res['data'].result[0].value[1])
            this.OverallMonitorData.DiskData = res['data'].result[0].value[1];
        })
        this.__prometheusService.getNetworkOverallInfo().subscribe(res => {
            console.log(res['data'].result[0].value[1])
            this.OverallMonitorData.NetworkData = res['data'].result[0].value[1];
        })







        // var req = {
        //     method: 'GET',//请求的方式
        //     url: 'http://192.168.88.252:9090/api/v1/query?query=100%20*%20sum(node_cpu_seconds_total{instance=%22192.168.88.252:9100%22,%20mode!=%22idle%22})%20/%20sum(node_cpu_seconds_total)',//请求的地址
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //         'Accept': '*/*'
        //     },//请求的头，如果默认可以不写
        //     timeout:5000//超时时间，还没有测试

        // };




        // this.getCPUOverallInfo().then(function(value){
        //       console.log(value['value'][1]);
        //     //   this.OverallMonitorData.CpuData = value['value'][1];
        //       this.test="test";
        // });
        // this.getGPUOverallInfo().then(function(value){
        //     console.log(value['value'][1]);
        //  //   this.OverallMonitorData.GpuData = value['value'][1];
        // });
        // this.getDiskOverallInfo().then(function(value){
        //     console.log(value['value'][1]);
        //   //  this.OverallMonitorData.DiskData = value['value'][1];
        // })
        // this.getNetworkOverallInfo().then(function(value){
        //     console.log(value['value'][1]);
        //    // this.OverallMonitorData.networkData = value['value'][1];
        // })











        // let rowData = {
        //     'cpu': [
        //         [0, 0], [1, 10], [2, 23], [3, 17], [4, 18], [5, 9],
        //         [6, 11], [7, 27], [8, 33], [9, 40], [10, 32], [11, 35],
        //         [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        //         [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        //         [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        //         [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        //         [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        //         [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        //         [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        //         [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        //         [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        //         [66, 70], [67, 72], [68, 75], [69, 80]
        //     ],
        //     memory: [
        //         [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        //         [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        //         [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        //         [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        //         [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        //         [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69]
        //     ],
        //     throughput: [
        //         [0, 0], [1, 10], [2, 23], [3, 17], [4, 18], [5, 9],
        //         [6, 11], [7, 27], [8, 33], [9, 40], [10, 32], [11, 35],
        //         [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        //         [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        //         [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        //         [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65]
        //     ],
        //     io: [
        //         [0, 0], [1, 10], [2, 23], [3, 17], [4, 18], [5, 9],
        //         [6, 11], [7, 27], [8, 33], [9, 40], [10, 32], [11, 35],
        //         [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        //         [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        //         [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        //         [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69]
        //     ]
        // }

        // GoogleCharts.load(function () {
        //     var lineData1 = new GoogleCharts.api.visualization.DataTable();
        //     var lineData2 = new GoogleCharts.api.visualization.DataTable();
        //     var lineData3 = new GoogleCharts.api.visualization.DataTable();
        //     var lineData4 = new GoogleCharts.api.visualization.DataTable();
        //     lineData1.addColumn('number', 'X');
        //     lineData1.addColumn('number', 'Usage');
        //     lineData2.addColumn('number', 'X');
        //     lineData2.addColumn('number', 'Usage');
        //     lineData3.addColumn('number', 'X');
        //     lineData3.addColumn('number', 'Usage');
        //     lineData4.addColumn('number', 'X');
        //     lineData4.addColumn('number', 'Usage');
        //     lineData1.addRows(rowData['cpu']);
        //     lineData2.addRows(rowData['memory']);
        //     lineData3.addRows(rowData['throughput']);
        //     lineData4.addRows(rowData['io']);

        //     var pieData1 = GoogleCharts.api.visualization.arrayToDataTable([
        //         ['Effort', 'Amount given'],
        //         ['Used', 80],
        //         ['Avaliable', 20]
        //     ]);

        //     var pieData2 = GoogleCharts.api.visualization.arrayToDataTable([
        //         ['Effort', 'Amount given'],
        //         ['Used', 52],
        //         ['Avaliable', 48]
        //     ]);

        //     var pieData3 = GoogleCharts.api.visualization.arrayToDataTable([
        //         ['Effort', 'Amount given'],
        //         ['Used', 33],
        //         ['Avaliable', 67]
        //     ]);

        //     var pieData4 = GoogleCharts.api.visualization.arrayToDataTable([
        //         ['Effort', 'Amount given'],
        //         ['Used', 12],
        //         ['Avaliable', 88]
        //     ]);

        //     let cpuData = new ChartData(lineData1, document.getElementById('total_cpu_chart'), ['#716aca'], 'line');
        //     let gpuData = new ChartData(lineData2, document.getElementById('total_gpu_chart'), ['#007bff'], 'line');
        //     let networkData = new ChartData(lineData3, document.getElementById('total_network_chart'), ['#f4516c'], 'line');
        //     let diskData = new ChartData(lineData4, document.getElementById('total_disk_chart'), ['#34bfa3'], 'line');

        //     let machineData = new ChartData(pieData1, document.getElementById('total_machine_chart'), ['#007bff', '#70abff'], 'pie');
        //     let publicIpData = new ChartData(pieData2, document.getElementById('total_public_ip_chart'), ['#ffaa00', '#ffcc80'], 'pie');
        //     let privateIpData = new ChartData(pieData3, document.getElementById('total_private_ip_chart'), ['#f4516c', '#fA819c'], 'pie');
        //     let imageServerData = new ChartData(pieData4, document.getElementById('total_image_server_chart'), ['#34bfa3', '#64efd3'], 'pie');

        //     ChartService.drawGraph(cpuData);
        //     ChartService.drawGraph(gpuData)
        //     ChartService.drawGraph(networkData)
        //     ChartService.drawGraph(diskData)

        //     ChartService.drawGraph(machineData);
        //     ChartService.drawGraph(publicIpData)
        //     ChartService.drawGraph(privateIpData)
        //     ChartService.drawGraph(imageServerData)
        // });



    }
    // ngAfterViewInit() {
    //     this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
    //         'assets/app/js/dashboard.js');
    // }


    download(index) {
        //console.log(index);
        window.open(this.histories[index].resultUrl);
    }



    getCPUOverallInfo() {
        return new Promise((resolve, reject) => {
            $.get(`
            http://192.168.88.252:9090/api/v1/query?query=100%20*%20sum(node_cpu_seconds_total{%20mode!=%22idle%22})%20/%20sum(node_cpu_seconds_total)`, function(result) {
                    resolve(result.data.result[0])
                }).fail(reject);
        });
    }

    getGPUOverallInfo() {
        return new Promise((resolve, reject) => {
            $.get(`
            http://192.168.88.252:9090/api/v1/query?query=sum(dcgm_gpu_utilization)%2Fcount(dcgm_gpu_utilization)`, function(result) {
                    resolve(result.data.result[0])
                }).fail(reject);
        });
    }


    getNetworkOverallInfo() {
        return new Promise((resolve, reject) => {
            $.get(`
            http://192.168.88.252:9090/api/v1/query?query=sum(node_network_receive_bytes_total%20%2B%20node_network_transmit_bytes_total)`, function(result) {
                    resolve(result.data.result[0])
                }).fail(reject);
        });
    }


    getDiskOverallInfo() {
        return new Promise((resolve, reject) => {
            $.get(`
            http://192.168.88.252:9090/api/v1/query?query=(sum(node_disk_written_bytes_total)%20%2B%20sum(node_disk_read_bytes_total))`, function(result) {
                    resolve(result.data.result[0])
                }).fail(reject);
        });
    }




}

