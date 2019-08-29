import { Pipe } from "@angular/core";
import { STATUS } from "../_models/status";
@Pipe({
    name: "status"
})
export class StatusPipe {
    transform(num: number): string {
        let status = ""
        switch (num) {
            case STATUS.timeout:
                return "Timeout";
            case STATUS.miningFailed:
                return "Mining Failed";
            case STATUS.unknown:
                return "Unknown";
            case STATUS.paid:
                return "Paid";
            case STATUS.mined:
                return "Mined"
            case STATUS.assigned:
                return "Assigned";
            case STATUS.start:
                return "Start";
            case STATUS.completed:
                return "Completed";
            case STATUS.error:
                return "Error";
            case STATUS.cancelled:
                return "Cancelled";
        }
    }
}