import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IOnlineOrderItem } from 'app/shared/model/online-order-item.model';
import { OnlineOrderItemService } from './online-order-item.service';
import { IOnlineOrder } from 'app/shared/model/online-order.model';
import { OnlineOrderService } from 'app/entities/online-order';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';

@Component({
    selector: 'jhi-online-order-item-update',
    templateUrl: './online-order-item-update.component.html'
})
export class OnlineOrderItemUpdateComponent implements OnInit {
    private _onlineOrderItem: IOnlineOrderItem;
    isSaving: boolean;
    onlineorders: IOnlineOrder;
    articles: IArticle[];
    idOfOrder: number;

    constructor(
        private jhiAlertService: JhiAlertService,
        private onlineOrderItemService: OnlineOrderItemService,
        private onlineOrderService: OnlineOrderService,
        private articleService: ArticleService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        if (this.activatedRoute.snapshot.params['orderid']) {
            this.idOfOrder = +this.activatedRoute.snapshot.params['orderid'];
        }
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ onlineOrderItem }) => {
            this.onlineOrderItem = onlineOrderItem;
        });
        this.onlineOrderService.find(this.idOfOrder).subscribe(
            (res: HttpResponse<IOnlineOrder>) => {
                this.onlineorders = res.body;
                this.onlineOrderItem.onlineOrder = this.onlineorders;
                console.log('id od online ordera je ' + this.onlineorders.id);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.articleService.query().subscribe(
            (res: HttpResponse<IArticle[]>) => {
                this.articles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.onlineOrderItem.id !== undefined) {
            this.subscribeToSaveResponse(this.onlineOrderItemService.update(this.onlineOrderItem));
        } else {
            this.subscribeToSaveResponse(this.onlineOrderItemService.create(this.onlineOrderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOnlineOrderItem>>) {
        result.subscribe((res: HttpResponse<IOnlineOrderItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackOnlineOrderById(index: number, item: IOnlineOrder) {
        return item.id;
    }

    trackArticleById(index: number, item: IArticle) {
        return item.id;
    }
    get onlineOrderItem() {
        return this._onlineOrderItem;
    }

    set onlineOrderItem(onlineOrderItem: IOnlineOrderItem) {
        this._onlineOrderItem = onlineOrderItem;
    }

    setItemPrice() {
        if (this.onlineOrderItem.article && this.onlineOrderItem.orderedAmount) {
            this.onlineOrderItem.itemPrice = this.onlineOrderItem.article.price * this.onlineOrderItem.orderedAmount;
        }
    }

    addNew() {
        this.save();
        const url = this.onlineOrderItem.onlineOrder.id;
        this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['online-order/' + url + '/online-order-item/new']));
    }

    reRoute() {
        this.router.navigate(['online-order/' + this.onlineOrderItem.onlineOrder.id + '/edit']);
    }
}
