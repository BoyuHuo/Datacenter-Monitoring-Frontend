import { Pipe } from "@angular/core";

@Pipe({
    name: "fileSize"
})
export class FileSizePipe {
    transform(byte: number, keep: number): string {
        let unit: string;
        let val: number = byte;

        if (val > 1024 * 1024 * 1024) {
            val = val / 1024 / 1024 / 1024;
            unit = "GB"
        } else if (val > 1024 * 1024) {
            val = val / 1024 / 1024;
            unit = "MB"
        } else if (val > 1024) {
            val = val / 1024;
            unit = "KB"
        } else {
            unit = "B"
        }

        var result = val.toFixed(keep);


        return `${result} ${unit}`;
    }
}