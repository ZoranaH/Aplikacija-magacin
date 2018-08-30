export interface IClient {
    id?: number;
    name?: string;
    phoneNumber?: string;
    address?: string;
    email?: string;
}

export class Client implements IClient {
    constructor(public id?: number, public name?: string, public phoneNumber?: string, public address?: string, public email?: string) {}
}
