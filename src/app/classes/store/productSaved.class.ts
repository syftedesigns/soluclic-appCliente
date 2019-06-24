// Clase que se encarga de administrar el carrito y la wishlist
export class ObjectSavedProductClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public customer_id: string,
        // tslint:disable-next-line:variable-name
        public session_id: string,
        // tslint:disable-next-line:variable-name
        public product_id: string | number,
        // tslint:disable-next-line:variable-name
        public recurring_id: string,
        public option: string,
        public quantity: string,
        // tslint:disable-next-line:variable-name
        public date_added: string,
        // tslint:disable-next-line:variable-name
        public api_id?: string,
        // tslint:disable-next-line:variable-name
        public cart_id?: string
    ) {}
}
