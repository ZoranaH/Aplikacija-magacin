import { IClient } from 'app/shared/model//client.model';
import { ICity } from 'app/shared/model//city.model';

export interface IOnlineOrder {
    id?: number;
    address?: string;
    phoneNumber?: string;
    totalPrice?: number;
    client?: IClient;
    city?: ICity;
}

export class OnlineOrder implements IOnlineOrder {
    constructor(
        public id?: number,
        public address?: string,
        public phoneNumber?: string,
        public totalPrice?: number,
        public client?: IClient,
        public city?: ICity
    ) {}
}
