// Clase que se encarga de las alianzas
export class ObjectManufacturerClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public manufacturer_id: number,
        public name: string,
        public image: string,
        // tslint:disable-next-line:variable-name
        public sort_order?: string
    ) {}
}
