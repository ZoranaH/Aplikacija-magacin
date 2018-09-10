import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrezaArticleModule } from './article/article.module';
import { BrezaCityModule } from './city/city.module';
import { BrezaClientModule } from './client/client.module';
import { BrezaEmployeeModule } from './employee/employee.module';
import { BrezaPositionModule } from './position/position.module';
import { BrezaTypeModule } from './type/type.module';
import { BrezaOnlineOrderModule } from './online-order/online-order.module';
import { BrezaOnlineOrderItemModule } from './online-order-item/online-order-item.module';
import { BrezaVehicleModule } from './vehicle/vehicle.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BrezaArticleModule,
        BrezaCityModule,
        BrezaClientModule,
        BrezaEmployeeModule,
        BrezaPositionModule,
        BrezaTypeModule,
        BrezaOnlineOrderModule,
        BrezaOnlineOrderItemModule,
        BrezaVehicleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrezaEntityModule {}
