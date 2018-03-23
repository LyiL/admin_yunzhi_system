import {BrowserModule} from "@angular/platform-browser";
import {NgModule, LOCALE_ID, APP_INITIALIZER} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CommonModule} from "./common/common.module";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {LayoutModule} from "./layout/layout.module";
import {StartupService} from "./common/services/startup.service";
// i18n
import {I18NService} from "./common/i18n/i18n.service";
import {ALAIN_I18N_TOKEN} from "@delon/theme";
import {DefaultInterceptor} from "./common/net/default.interceptor";
import {AppRoutesModule} from "./app.routes.module";
import {LoginComponent} from "./login/login.component";
import {NZ_LOGGER_STATE} from "ng-zorro-antd";
import {AlainAuthModule} from "@delon/auth";
import {ImagePreviewService, AlainABCModule, AdImagePreviewModule} from "@delon/abc";
import {registerLocaleData} from "@angular/common";
import localeZhHans from "@angular/common/locales/zh-Hans";
import {CostomTranslateHttpLoader} from "./common/i18n/translate.http.loader";
import {I18N_FILES} from "../webassets/i18n/i18n-files.config";
import {RouterInterceptService} from "./common/services/router.intercept.service";
import {LockScreenComponent} from "./lock-screen/lock-screen.component";
registerLocaleData(localeZhHans);

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//     return new TranslateHttpLoader(http, `webassets/i18n/`, '.json');
// }

export function CustomHttpLoaderFactory(){
    return new CostomTranslateHttpLoader(I18N_FILES);
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LockScreenComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        AlainABCModule.forRoot(),
        AdImagePreviewModule.forRoot(),
        CommonModule,
        LayoutModule,
        AppRoutesModule,
        // ...MODULE_CONST,
        // auth
        AlainAuthModule.forRoot({
            login_url: `/login`
        }),
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: CustomHttpLoaderFactory
            }
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        { provide: NZ_LOGGER_STATE, useValue: true },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
        StartupService,
        ImagePreviewService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        RouterInterceptService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
