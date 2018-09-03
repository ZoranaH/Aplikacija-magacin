import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrezaSharedModule } from 'app/shared';
import {
    TypeComponent,
    TypeDetailComponent,
    TypeUpdateComponent,
    TypeDeletePopupComponent,
    TypeDeleteDialogComponent,
    typeRoute,
    typePopupRoute
} from './';

const ENTITY_STATES = [...typeRoute, ...typePopupRoute];

@NgModule({
    imports: [BrezaSharedModule, RouterModule.forChild(ENTITY_STATES), Ng2SmartTableModule],
    declarations: [TypeComponent, TypeDetailComponent, TypeUpdateComponent, TypeDeleteDialogComponent, TypeDeletePopupComponent],
    entryComponents: [TypeComponent, TypeUpdateComponent, TypeDeleteDialogComponent, TypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrezaTypeModule {}
