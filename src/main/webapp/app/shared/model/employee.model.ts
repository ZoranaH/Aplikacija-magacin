import { ICity } from 'app/shared/model//city.model';

export interface IEmployee {
    id?: number;
    name?: string;
    salary?: number;
    city?: ICity;
}

export class Employee implements IEmployee {
    constructor(public id?: number, public name?: string, public salary?: number, public city?: ICity) {}
}
