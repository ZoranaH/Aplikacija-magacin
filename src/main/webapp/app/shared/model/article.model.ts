import { IClient } from 'app/shared/model//client.model';
import { IEmployee } from 'app/shared/model//employee.model';

export interface IArticle {
    id?: number;
    name?: string;
    amount?: number;
    client?: IClient;
    employee?: IEmployee;
}

export class Article implements IArticle {
    constructor(public id?: number, public name?: string, public amount?: number, public client?: IClient, public employee?: IEmployee) {}
}
