
export class Product {
    constructor(
        public _id: string,
        public name: string,
        public specifications: ProductSpecification[],
        public description?: string,
        public images?: string[],
        public defaultImage?: string,
        public creationDate?: Date,
        public comments?: Comment[]
    ) {}
}

export class ProductSpecification {
    constructor(
        public _id: string,
        public productId: string,
        public category: string,
        public name: string,
        public value: string,
        public isImportant: boolean,
        public creationDate?: Date
    ) {}
}