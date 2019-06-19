// Clase que se encargara de manejar los productos
export class ObjectProductClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public meta_title: string,
        // tslint:disable-next-line:variable-name
        public product_id: string | number,
        public model: string,
        public quantity: string | number,
        // tslint:disable-next-line:variable-name
        public stock_status_id: strign | number,
        public image: string,
        // tslint:disable-next-line:variable-name
        public manufacturer_id: string | number,
        public shipping: string | number,
        public price: number | string,
        public points: number | string,
        // tslint:disable-next-line:variable-name
        public tax_class_id: string | number,
        // tslint:disable-next-line:variable-name
        public date_available: Date | string,
        public weight: number | string,
        // tslint:disable-next-line:variable-name
        public weight_class_id: number | string,
        public length: number | string,
        public width: number | string,
        public height: number | string,
        public substract: number | string,
        public minimum: number | string,
        // tslint:disable-next-line:variable-name
        public sort_order: number | string,
        public status: boolean | number | string,
        public viewed: number | string,
        // tslint:disable-next-line:variable-name
        public date_added: Date | string,
        // tslint:disable-next-line:variable-name
        public date_modified: Date | string,
        public name: string,
        public description: string,
        public tag: string,
        // tslint:disable-next-line:variable-name
        public meta_title: string,
        // tslint:disable-next-line:variable-name
        public meta_description: string,
        public item: string,
        // tslint:disable-next-line:variable-name
        public customer_group_id: number | string,
        // tslint:disable-next-line:variable-name
        // tslint:disable-next-line:variable-name
        public product_reward_id: string | number,
        // tslint:disable-next-line:variable-name
        public category_id: string | number,
        public catdata: string,
        public catname: string,
        public stock: string,
        // tslint:disable-next-line:variable-name
        public attribute_id?: number | string,
        public alianza: string,
        public text?: string,
        // tslint:disable-next-line:variable-name
        public filter_id?: string | number,
        public descuento?: number | string,
        // tslint:disable-next-line:variable-name
        public product_option_id?: string | number,
        // tslint:disable-next-line:variable-name
        public option_id?: string | number,
        public value?: string,
        public required?: string,
        // tslint:disable-next-line:variable-name
        public related_id?: string | number,
        // tslint:disable-next-line:variable-name
        public recurring_id?: string | number,
        public sku?: string,
        public upc?: string,
        public ean?: string,
        public jan?: string,
        public isbn?: string,
        public mpn?: string,
    ) {
    }
}
