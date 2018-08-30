export interface ICity {
    id?: number;
    name?: string;
    zipcode?: number;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public zipcode?: number) {}
}
