export class Product {
    id: number;
    category: string;
    spec: string;
    description: string;
    ledgerList: any[];
    mpb: number;

    constructor(id, category, spec, ledgerList, mpb, description) {
        this.id = id;
        this.category = category;
        this.spec = spec;
        this.ledgerList = ledgerList;
        this.mpb = mpb;
        this.description = description;
    }
}
