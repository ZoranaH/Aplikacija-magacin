import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPosition } from 'app/shared/model/position.model';
import { Principal } from 'app/core';
import { PositionService } from './position.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-position',
    templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit, OnDestroy {
    positions: IPosition[];
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
            name: {
                title: 'Name'
            }
        }
    };
    data: LocalDataSource;

    constructor(
        private positionService: PositionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.positionService.query().subscribe(
            (res: HttpResponse<IPosition[]>) => {
                this.positions = res.body;
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
        this.registerChangeInPositions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPosition) {
        return item.id;
    }

    registerChangeInPositions() {
        this.eventSubscriber = this.eventManager.subscribe('positionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    addNew(event) {
        this.router.navigate(['position/new']);
    }

    addCustom(event) {
        if (event.action === 'View') {
            this.router.navigate(['position/' + event.data.id + '/view']);
            console.log(event);
        } else if (event.action === 'Delete') {
            this.router.navigate(['/', { outlets: { popup: 'position/' + event.data.id + '/delete' } }]);
            console.log(event);
        } else if (event.action === 'Edit') {
            this.router.navigate(['position/' + event.data.id + '/edit']);
            console.log(event);
        }
    }
}
