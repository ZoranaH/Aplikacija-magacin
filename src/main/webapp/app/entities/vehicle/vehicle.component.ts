import { Account } from './../../core/user/account.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehicle } from 'app/shared/model/vehicle.model';
import { Principal } from 'app/core';
import { VehicleService } from './vehicle.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit, OnDestroy {
    vehicles: IVehicle[];
    currentAccount: any;
    eventSubscriber: Subscription;
    settings = {
        mode: 'inline',
        actions: {
            columnTitle: '',
            edit: true,
            delete: false,
            custom: [{ name: 'View', title: 'View ' }, { name: 'Delete', title: 'Delete' }]
        },
        columns: {
            id: {
                title: 'Id',
                editable: false,
                addable: false
            },
            vehicleNumber: {
                title: 'Vehicle number'
            },
            brand: {
                title: 'Brand'
            },
            model: {
                title: 'Model'
            }
        },
        add: {
            addButtonContent: 'Add new vehicle',
            confirmCreate: true
        },
        edit: {
            confirmSave: true
        },
        attr: {
            class: 'table table-striped table-bordered table-hover'
        }
    };
    data: LocalDataSource;

    constructor(
        private vehicleService: VehicleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.vehicleService.query().subscribe(
            (res: HttpResponse<IVehicle[]>) => {
                this.vehicles = res.body;
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
        this.registerChangeInVehicles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVehicle) {
        return item.id;
    }

    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    addNew(event) {
        this.router.navigate(['vehicle/new']);
    }

    addCustom(event) {
        if (event.action === 'View') {
            this.router.navigate(['vehicle/' + event.data.id + '/view']);
            console.log(event);
        } else if (event.action === 'Delete') {
            this.router.navigate(['/', { outlets: { popup: 'vehicle/' + event.data.id + '/delete' } }]);
            console.log(event);
        }
    }

    onEditConfirm(event) {
        const brand = event.newData['brand'];
        const model = event.newData['model'];
        if (brand && model && brand[0] !== brand[0].toLowerCase() && model[0] !== model[0].toLowerCase()) {
            if (window.confirm('Are you sure you want to save?')) {
                //    event.newData['brand'] = event.newData['brand'];
                //    event.newData['model'] = event.newData['model'];
                event.confirm.resolve(event.newData);
            }
        } else {
            window.alert('Ime brenda i/ili modela mora poceti velikim slovom i polje ne sme ostati prazno');
            event.confirm.reject();
        }
    }

    onCreateConfirm(event) {
        const brand = event.newData['brand'];
        const model = event.newData['model'];
        if (brand && model && brand[0] !== brand[0].toLowerCase() && model[0] !== model[0].toLowerCase()) {
            if (window.confirm('Are you sure you want to create?')) {
                //  event.newData['brand'] = event.newData['brand'];
                event.confirm.resolve(event.newData);
            }
        } else {
            window.alert('Ime brenda i/ili modela mora poceti velikim slovom i polje ne sme ostati prazno');
            event.confirm.reject();
        }
    }
}
