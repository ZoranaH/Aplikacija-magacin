import { IOnlineOrder } from 'app/shared/model//online-order.model';

export interface IOnlineOrderItem {
    id?: number;
    orderedAmount?: number;
    itemPrice?: number;
    onlineOrder?: IOnlineOrder;
}

export class OnlineOrderItem implements IOnlineOrderItem {
    constructor(public id?: number, public orderedAmount?: number, public itemPrice?: number, public onlineOrder?: IOnlineOrder) {}
}
