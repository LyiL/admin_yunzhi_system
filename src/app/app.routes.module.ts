import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {RouterInterceptService} from "./common/services/router.intercept.service";
import {LockScreenComponent} from "./lock-screen/lock-screen.component";

const APP_ROUTES:Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'admin', component:LayoutComponent,
        children:[{path:'system',loadChildren:'./bsmodules/system-manage/system-manage.module#SystemManageModule'},
            {path:'marketing',loadChildren:'./bsmodules/marketing-manage/marketing-manage.module#MarketingManageModule'},
            {path:'payment',loadChildren:'./bsmodules/payment-settings/payment-settings.module#PaymentSettingsModule'},
            {path:'center',loadChildren:'./bsmodules/center-manage/center-manage.module#CenterManageModule'},
            {path:'systemlog',loadChildren:'./bsmodules/system-log/system-log.module#SystemLogModule'}],
        canActivate:[RouterInterceptService],
        canActivateChild:[RouterInterceptService]
    },
    {path:'login', component:LoginComponent},
    {path:'lock', component:LockScreenComponent},
    {path:'**', redirectTo:'/login'}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutesModule {}
