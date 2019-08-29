import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        // "canActivate": [AuthGuard],
        "children": [

            /**********   main pages         ************************/
            {
                "path": "dashboard",
                "loadChildren": ".\/pages\/default\/dashboard\/dashboard.module#DashboardModule"
            },
            {
                "path": "group",
                "loadChildren": ".\/pages\/default\/cluster\/cluster.module#ClusterModule"
            },
            {
                "path": "cluster/:id",
                "loadChildren": ".\/pages\/default\/cluster-detail\/cluster-detail.module#ClusterDetailModule"
            },
            {
                "path": "host",
                "loadChildren": ".\/pages\/default\/host\/host.module#HostModule"
            },
            {
                "path": "host/:id",
                "loadChildren": ".\/pages\/default\/host-detail\/host-detail.module#HostDetailModule"
            },
            {
                "path": "image",
                "loadChildren": ".\/pages\/default\/image\/image.module#ImageModule"
            },
            {
                "path": "machine",
                "loadChildren": ".\/pages\/default\/machine-info\/machine-info.module#MachineInfoModule"
            },
            {
                "path": "",
                "redirectTo": "dashboard",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "404",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-6\/errors-error-6.module#ErrorsError6Module"
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), NgbModule.forRoot(),],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }
