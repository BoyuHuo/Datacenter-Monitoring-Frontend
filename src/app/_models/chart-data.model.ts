export class ChartData {
    selector: Element;
    data: any[];
    colors: any[];
    type: string;

    constructor(data, selector, colors, type) {
        this.selector = selector;
        this.data = data;
        this.colors = colors;
        this.type = type;
    }
} 