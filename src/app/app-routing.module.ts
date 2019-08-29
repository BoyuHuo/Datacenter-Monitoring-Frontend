import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
// import { ResetComponent } from "./auth/reset.component";
// import { SalesComponent } from "./theme/pages/default/sales/sales.component";
// import { ProductsComponent } from "./theme/pages/default/sales/products/products.component"
// import { OrdersComponent } from "./theme/pages/default/sales/orders/orders.component"
// import { CategoriesComponent } from "./theme/pages/default/sales/categories/categories.component"
import { AuthGuard } from './auth/_guards';

const routes: Routes = [
    { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'logout', component: LogoutComponent },
    // { path: 'reset', component: ResetComponent },
    // {
    //     path: 'sales', component: SalesComponent,
    //     children: [
    //         // { path: '', redirectTo: 'general', pathMatch: 'full' },
    //         { path: 'products', component: ProductsComponent, data: {} },
    //         { path: 'orders', component: OrdersComponent, data: {} },
    //         { path: 'categories', component: CategoriesComponent, data: {} }
    //     ]
    // },
    { path: 'index', redirectTo: 'login', pathMatch: 'full' },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
