// Clase que maneja las direcciones
export class ObjectAddrClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public customer_id: string,
        public firstname: string,
        public lastname: string,
        public company: string,
        // tslint:disable-next-line:variable-name
        public address_1: string,
        // tslint:disable-next-line:variable-name
        public address_2: string,
        public city: string,
        public postcode: string,
        // tslint:disable-next-line:variable-name
        public country_id: string | any,
        // tslint:disable-next-line:variable-name
        public zone_id: string | any,
        // tslint:disable-next-line:variable-name
        public custom_field,
        // tslint:disable-next-line:variable-name
        public address_id?: string
    ) {}
}
