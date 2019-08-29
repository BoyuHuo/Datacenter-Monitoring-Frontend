import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { ProgressHttpModule } from "angular-progress-http";
// import { SalesComponent } from './theme/pages/default/sales/sales.component';
// import { ProductsComponent } from "./theme/pages/default/sales/products/products.component"
// import { OrdersComponent } from "./theme/pages/default/sales/orders/orders.component"
// import { CategoriesComponent } from "./theme/pages/default/sales/categories/categories.component"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { IndexComponent } from './theme/index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuNavDirective } from './_directives/menu-nav.directive';
import { CustomerService } from './_services/customer.service';
import { WorkerService } from './_services/worker.service';
import { NgbdModalSide } from './theme/layouts/aside-nav/aside-nav.component';
import { NgbdModalHeader } from './theme/layouts/header-nav/header-nav.component';
import { PrometheusService } from './auth/_services';
import { IpmiService } from './auth/_services';
// import { TaskComponent } from './theme/pages/task/task.component';
// import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,
        IndexComponent,
        MenuNavDirective,
        NgbdModalSide,
        NgbdModalHeader,
        // SalesComponent,
        // ProductsComponent,
        // OrdersComponent,
        // CategoriesComponent
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        ProgressHttpModule,
        NgbModule.forRoot(),
        // QRCodeModule,
    ],
    entryComponents: [
        NgbdModalSide,
        NgbdModalHeader,
    ],
    providers: [ScriptLoaderService, CustomerService, WorkerService, PrometheusService, IpmiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
