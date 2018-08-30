export interface ICity {
    id?: number;
    name?: string;
    postalCode?: number;
    country?: string;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public postalCode?: number, public country?: string) {}
}
