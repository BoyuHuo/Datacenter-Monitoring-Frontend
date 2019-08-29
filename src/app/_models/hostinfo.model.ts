export class HostInfo {
    ip: string;
    cpu: { value: object[] };
    gpu: {
        name: string,
        number: number,
        value: object[]
    };
    constructor(ip, cpu = {}, gpu = {}) {
        // this.ip = ip;
        // this.cpu = Object.assign({}, cpu)
        // this.gpu = Object.assign({}, gpu)
    }
}