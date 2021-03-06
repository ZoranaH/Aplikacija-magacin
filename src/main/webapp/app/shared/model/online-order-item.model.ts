import { IOnlineOrder } from 'app/shared/model//online-order.model';
import { IArticle } from 'app/shared/model//article.model';

export interface IOnlineOrderItem {
    id?: number;
    orderedAmount?: number;
    itemPrice?: number;
    onlineOrder?: IOnlineOrder;
    article?: IArticle;
    onlineOrderName?: number;
    articleName?: string;
    articlePrice?: number;
}

export class OnlineOrderItem implements IOnlineOrderItem {
    constructor(
        public id?: number,
        public orderedAmount?: number,
        public itemPrice?: number,
        public onlineOrder?: IOnlineOrder,
        public article?: IArticle
    ) {}
}
