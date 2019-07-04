// Clase que maneja los paises
export class ObjectCountryClass {
    constructor(
        public name: string,
        // tslint:disable-next-line:variable-name
        public iso_code_2: string,
        // tslint:disable-next-line:variable-name
        public iso_code_3: string,
        // tslint:disable-next-line:variable-name
        public address_format: string,
        // tslint:disable-next-line:variable-name
        public postcode_required: string,
        public status: boolean,
        // tslint:disable-next-line:variable-name
        public country_id?: string
    ) {}
}
// Clase que maneja las regiones o provincias
export class ObjectRegionClass {
    constructor(
        public name: string,
        public code: string,
        public status: boolean,
        // tslint:disable-next-line:variable-name
        public country_id: string,
        // tslint:disable-next-line:variable-name
        public zone_id: string
    ) {}
}
