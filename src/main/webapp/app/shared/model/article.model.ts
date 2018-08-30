import { IClient } from 'app/shared/model//client.model';

export interface IArticle {
    id?: number;
    name?: string;
    amount?: number;
    client?: IClient;
}

export class Article implements IArticle {
    constructor(public id?: number, public name?: string, public amount?: number, public client?: IClient) {}
}
