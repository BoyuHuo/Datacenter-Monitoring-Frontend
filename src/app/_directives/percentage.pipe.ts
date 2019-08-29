import { Pipe } from "@angular/core";

@Pipe({
    name: "percentage"
})
export class PercentagePipe {
    transform(str: string, keep: number): string {
        if (!str) return '';

        var result = parseFloat(str).toFixed(keep);


        return `${result}%`;
    }
}