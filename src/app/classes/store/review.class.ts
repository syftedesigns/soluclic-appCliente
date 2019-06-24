// Clase que se encarga de la calificación y comentarios
export class ObjectReviewClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public customer_id: string,
        public author: string,
        public text: string,
        public rating: number,
        public status: boolean,
        // tslint:disable-next-line:variable-name
        public date_added: Date,
        // tslint:disable-next-line:variable-name
        public date_modified: Date,
        // tslint:disable-next-line:variable-name
        public review_id?: string,
        // tslint:disable-next-line:variable-name
        public product_id?: string,
        public Average?: number
    ) {}
}
