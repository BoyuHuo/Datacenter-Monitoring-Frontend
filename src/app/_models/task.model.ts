export class Task {
    worker_id: number;
    contract: string;
    status: string;
    occur_time: string;

    constructor(worker_id, contract, status, occur_time) {
        this.worker_id = worker_id;
        this.contract = contract;
        this.status = status;
        this.occur_time = occur_time;
    }
}
