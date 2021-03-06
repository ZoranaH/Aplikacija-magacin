import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOnlineOrderItem } from 'app/shared/model/online-order-item.model';
import { Principal } from 'app/core';
import { OnlineOrderItemService } from './online-order-item.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-online-order-item',
    templateUrl: './online-order-item.component.html'
})
export class OnlineOrderItemComponent implements OnInit, OnDestroy {
    onlineOrderItems: IOnlineOrderItem[];
    currentAccount: any;
    eventSubscriber: Subscription;
    settings = {
        mode: 'external',
        actions: {
            edit: false,
            delete: false,
            custom: [{ name: 'View', title: 'View ' }, { name: 'Edit', title: 'Edit ' }, { name: 'Delete', title: 'Delete' }]
        },
        columns: {
            id: {
                title: 'ID'
            },
            orderedAmount: {
                title: 'Ordered Amount'
            },
            itemPrice: {
                title: 'Item Price'
            },
            onlineOrderName: {
                title: 'Online Order'
            },
            articleName: {
                title: 'Article'
            },
            articlePrice: {
                title: 'Article price'
            }
        }
    };
    data: LocalDataSource;
    idOfItem: number;

    constructor(
        private onlineOrderItemService: OnlineOrderItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    loadAll() {
        this.onlineOrderItemService.findByOnlineOrder(this.idOfItem).subscribe(
            (res: HttpResponse<IOnlineOrderItem[]>) => {
                this.onlineOrderItems = res.body;
                this.data = new LocalDataSource();
                let totalPricePerOrder = 0;
                for (const onlineOrder of res.body) {
                    if (onlineOrder.onlineOrder !== null) {
                        onlineOrder.onlineOrderName = onlineOrder.onlineOrder.id;
                    } else {
                        onlineOrder.onlineOrderName = 0;
                    }
                    if (onlineOrder.article !== null) {
                        onlineOrder.articleName = onlineOrder.article.name;
                    } else {
                        onlineOrder.articleName = '...';
                    }
                    if (onlineOrder.article.price !== null) {
                        onlineOrder.itemPrice = onlineOrder.article.price * onlineOrder.orderedAmount;
                        onlineOrder.articlePrice = onlineOrder.article.price;
                        totalPricePerOrder += onlineOrder.itemPrice;
                        // console.log('total price je ', totalPricePerOrder);
                    } else {
                        onlineOrder.itemPrice = 0;
                    }
                    this.data.add(onlineOrder);
                    // console.log('vrednost je ' + onlineOrder.onlineOrder.id);
                }
                this.brodcastToOnlineOrderTotalPice(totalPricePerOrder);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params['id']) {
            this.idOfItem = +this.activatedRoute.snapshot.params['id'];
            this.loadAll();
        }
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOnlineOrderItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOnlineOrderItem) {
        return item.id;
    }

    registerChangeInOnlineOrderItems() {
        this.eventSubscriber = this.eventManager.subscribe('onlineOrderItemListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    addNew(event) {
        this.brodcastToOnlineOrderUpdate();
        setTimeout(() => this.router.navigate(['online-order/' + this.idOfItem + '/online-order-item/new']), 100);
    }

    addCustom(event) {
        this.brodcastToOnlineOrderUpdate();
        if (event.action === 'View') {
            setTimeout(
                () => this.router.navigate(['online-order/' + this.idOfItem + '/online-order-item/' + event.data.id + '/view']),
                100
            );
        } else if (event.action === 'Delete') {
            setTimeout(() => this.router.navigate(['/', { outlets: { popup: 'online-order-item/' + event.data.id + '/delete' } }]), 100);
        } else if (event.action === 'Edit') {
            this.router.navigate(['online-order/' + this.idOfItem + '/online-order-item/' + event.data.id + '/edit']);
            // console.log(event);
        }
    }

    brodcastToOnlineOrderUpdate() {
        this.eventManager.broadcast({
            name: 'changeSaveOnlineOrder',
            content: ''
        });
    }

    brodcastToOnlineOrderTotalPice(totalPrice: number) {
        this.eventManager.broadcast({
            name: 'onlineOrderTotalPrice',
            content: totalPrice
        });
    }
}
