import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

// const workerURL = environment.workerURL;
@Injectable()
export class WorkerService {

    constructor(private http: HttpClient) {
    }
    // GetAddress(api: string, type: string) {
    //     return this.http.get(`${api}/address/${type}`);
    // }

    // GetTasks(workerId: string) {
    //     return this.http.get(`${workerURL}/workerinfotask/workerid/${workerId}`);
    // }

    // GetTasksByOwner(ownerId: string) {
    //     return this.http.get(`${workerURL}/taskstatus/owneraddr/${ownerId}`)
    // }

    // GetTransactions(n: number) {
    //     return this.http.get(`${workerURL}/recent10`);
    // }
}
