import { BrezaOnlineOrderItemModule } from './../online-order-item/online-order-item.module';
import { OnlineOrderItem } from 'app/shared/model/online-order-item.model';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrezaSharedModule } from 'app/shared';
import {
    OnlineOrderComponent,
    OnlineOrderDetailComponent,
    OnlineOrderUpdateComponent,
    OnlineOrderDeletePopupComponent,
    OnlineOrderDeleteDialogComponent,
    onlineOrderRoute,
    onlineOrderPopupRoute
} from './';

const ENTITY_STATES = [...onlineOrderRoute, ...onlineOrderPopupRoute];

@NgModule({
    imports: [BrezaSharedModule, RouterModule.forChild(ENTITY_STATES), Ng2SmartTableModule, BrezaOnlineOrderItemModule],
    declarations: [
        OnlineOrderComponent,
        OnlineOrderDetailComponent,
        OnlineOrderUpdateComponent,
        OnlineOrderDeleteDialogComponent,
        OnlineOrderDeletePopupComponent
    ],
    entryComponents: [OnlineOrderComponent, OnlineOrderUpdateComponent, OnlineOrderDeleteDialogComponent, OnlineOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrezaOnlineOrderModule {}
