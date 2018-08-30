export interface IClient {
    id?: number;
    name?: string;
    phoneNumber?: string;
}

export class Client implements IClient {
    constructor(public id?: number, public name?: string, public phoneNumber?: string) {}
}
