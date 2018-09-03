import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICity } from 'app/shared/model/city.model';
import { Principal } from 'app/core';
import { CityService } from './city.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
    selector: 'jhi-city',
    templateUrl: './city.component.html'
})
export class CityComponent implements OnInit, OnDestroy {
    cities: ICity[];
    currentAccount: any;
    eventSubscriber: Subscription;
    settings = {
        columns: {
            id: {
                title: 'ID'
            },
            name: {
                title: 'Full Name'
            },
            username: {
                title: 'User Name'
            },
            email: {
                title: 'Email'
            }
        }
    };
    data = [
        {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz'
        },
        {
            id: 2,
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'Shanna@melissa.tv'
        },
        // ... list of items
        {
            id: 11,
            name: 'Nicholas DuBuque',
            username: 'Nicholas.Stanton',
            email: 'Rey.Padberg@rosamond.biz'
        }
    ];

    constructor(
        private cityService: CityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cityService.query().subscribe(
            (res: HttpResponse<ICity[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICity) {
        return item.id;
    }

    registerChangeInCities() {
        this.eventSubscriber = this.eventManager.subscribe('cityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
