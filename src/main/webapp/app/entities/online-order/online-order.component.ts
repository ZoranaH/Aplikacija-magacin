import { OnlineOrderItemService } from './../online-order-item/online-order-item.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOnlineOrder } from 'app/shared/model/online-order.model';
import { Principal } from 'app/core';
import { OnlineOrderService } from './online-order.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-online-order',
    templateUrl: './online-order.component.html'
})
export class OnlineOrderComponent implements OnInit, OnDestroy {
    onlineOrders: IOnlineOrder[];
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
            address: {
                title: 'Name'
            },
            phoneNumber: {
                title: 'Phone Number'
            },
            totalPrice: {
                title: 'Total Price'
            },
            clientName: {
                title: 'Client'
            },
            cityName: {
                title: 'City'
            }
        }
    };
    data: LocalDataSource;
    isHidden: boolean;

    constructor(
        private onlineOrderService: OnlineOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.onlineOrderService.query().subscribe(
            (res: HttpResponse<IOnlineOrder[]>) => {
                this.onlineOrders = res.body;
                this.data = new LocalDataSource();
                for (const onlineOrder of res.body) {
                    if (onlineOrder.client.name !== null) {
                        onlineOrder.clientName = onlineOrder.client.name;
                    } else {
                        onlineOrder.clientName = '...';
                    }
                    if (onlineOrder.city.name !== null) {
                        onlineOrder.cityName = onlineOrder.city.name;
                    } else {
                        onlineOrder.cityName = '...';
                    }
                    this.data.add(onlineOrder);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOnlineOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOnlineOrder) {
        return item.id;
    }

    registerChangeInOnlineOrders() {
        this.eventSubscriber = this.eventManager.subscribe('onlineOrderListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    addNew(event) {
        this.router.navigate(['online-order/new']);
    }

    addCustom(event) {
        if (event.action === 'View') {
            this.router.navigate(['online-order/' + event.data.id + '/view']);
            console.log(event);
        } else if (event.action === 'Delete') {
            this.router.navigate(['/', { outlets: { popup: 'online-order/' + event.data.id + '/delete' } }]);
            console.log(event);
        } else if (event.action === 'Edit') {
            this.router.navigate(['online-order/' + event.data.id + '/edit']);
            console.log(event);
        }
    }
}
