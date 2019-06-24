// Filtros que manejan los productos
export class ObjectFilterClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public filter_id: number,
        // tslint:disable-next-line:variable-name
        public filter_group_id: number,
        public Childs: string,
        public parent: string,
        // tslint:disable-next-line:variable-name
        public product_id: number
    ) {}
}
