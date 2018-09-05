import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOnlineOrderItem } from 'app/shared/model/online-order-item.model';
import { Principal } from 'app/core';
import { OnlineOrderItemService } from './online-order-item.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

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
            onlineOrder: {
                title: 'Online Order'
            },
            article: {
                title: 'Article'
            }
        }
    };
    data: LocalDataSource;

    constructor(
        private onlineOrderItemService: OnlineOrderItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.onlineOrderItemService.query().subscribe(
            (res: HttpResponse<IOnlineOrderItem[]>) => {
                this.onlineOrderItems = res.body;
                this.data = new LocalDataSource(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
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
        this.router.navigate(['online-order-item/new']);
    }

    addCustom(event) {
        if (event.action === 'View') {
            this.router.navigate(['online-order-item/' + event.data.id + '/view']);
            console.log(event);
        } else if (event.action === 'Delete') {
            this.router.navigate(['/', { outlets: { popup: 'online-order-item/' + event.data.id + '/delete' } }]);
            console.log(event);
        } else if (event.action === 'Edit') {
            this.router.navigate(['online-order-item/' + event.data.id + '/edit']);
            console.log(event);
        }
    }
}
