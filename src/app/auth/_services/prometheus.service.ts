import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ProgressHttp } from "angular-progress-http";
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_URL = environment.apiUrl;

@Injectable()
export class PrometheusService {
    constructor(private http: HttpClient, private httpProgress: ProgressHttp, private router: Router) {
    }

    private tokenHeader(token) {
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
        };
        return options;
    }

    GetMontoringCPU(input, token) {
        let ip = input.ip || '192.168.88.252';
        let startTimestamp = Math.round(new Date(input.start).getTime() / 1000)
        let endTimestamp = Math.round(new Date(input.end).getTime() / 1000)
        let timestep = input.timestep;
        return this.http.get(API_URL + `/status/cpu?ip=${input.ip}&start=${startTimestamp}&end=${endTimestamp}&step=${timestep}`, this.tokenHeader(token))
    }

    GetMontoringGPU(input, token) {
        let ip = input.ip || '192.168.88.252';
        let startTimestamp = Math.round(new Date(input.start).getTime() / 1000)
        let endTimestamp = Math.round(new Date(input.end).getTime() / 1000)
        let timestep = input.timestep;
        return this.http.get(API_URL + `/status/gpu?ip=${input.ip}&start=${input.start}&end=${input.end}&step=${input.timestep}`, this.tokenHeader(token))
    }

    GetHardware(token, sn) {
        return this.http.get(API_URL + `/hardware/${sn}`, this.tokenHeader(token));
    }


    getCPUOverallInfo() {
        return this.http.get(" http://192.168.88.252:9090/api/v1/query?query=100%20*%20sum(node_cpu_seconds_total{%20mode!=%22idle%22})%20/%20sum(node_cpu_seconds_total)")
    }

    getGPUOverallInfo() {
        return this.http.get(`http://192.168.88.252:9090/api/v1/query?query=sum(dcgm_gpu_utilization)%2Fcount(dcgm_gpu_utilization)`)
    }


    getNetworkOverallInfo() {
        return this.http.get(`
            http://192.168.88.252:9090/api/v1/query?query=sum(node_network_receive_bytes_total%20%2B%20node_network_transmit_bytes_total)`)
    }


    getDiskOverallInfo() {
        return this.http.get(`http://192.168.88.252:9090/api/v1/query?query=(sum(node_disk_written_bytes_total)%20%2B%20sum(node_disk_read_bytes_total))`)
    }




}