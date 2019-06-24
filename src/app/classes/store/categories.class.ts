// Clase que se encarga de las categorias
export class ObjectCategoriesClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public category_id: number,
        // tslint:disable-next-line:variable-name
        public language_id: number,
        public name: string,
        public description: string,
        // tslint:disable-next-line:variable-name
        public meta_title: string,
        // tslint:disable-next-line:variable-name
        public meta_description: string,
        // tslint:disable-next-line:variable-name
        public meta_keyword: string,
        // tslint:disable-next-line:variable-name
        public product_id?: number
    ) {}
}
