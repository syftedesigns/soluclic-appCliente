// Objeto de clase del cliente
export class ObjectCustomerClass {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public telephone: string,
        public fax: string,
        public password: string,
        public salt: string,
        public cart: string,
        public wishlist: string,
        public  newsletter: string,
        // tslint:disable-next-line:variable-name
        public address_id: string,
        // tslint:disable-next-line:variable-name
        public custom_field: string,
        public ip: string,
        public status: string,
        public safe: string,
        public token: string,
        public code: string,
        // tslint:disable-next-line:variable-name
        public date_added: Date,
        // tslint:disable-next-line:variable-name
        public customer_id?: string,
        // tslint:disable-next-line:variable-name
        public customer_group_id?: string,
        // tslint:disable-next-line:variable-name
        public store_id?: string,
        // tslint:disable-next-line:variable-name
        public language_id?: string
    ) {}
}
