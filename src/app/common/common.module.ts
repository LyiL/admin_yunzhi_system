import {NgModule, Optional, SkipSelf} from "@angular/core";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {AlainThemeModule} from "@delon/theme";
import {I18NService} from "./i18n/i18n.service";
import {CommonService} from "./services/request/common.service";
import {ObjectExtend} from "ng-zorro-antd";
import {HttpService} from "./net/http.service";
import {AuthService} from "./services/auth/auth.service";
import {HelperService} from "./services/helper.service";
import {GlobalMonitorService} from "./services/global.monitor.service";

@NgModule({
    imports: [
       AlainThemeModule.forRoot()
    ],
    providers: [
        ObjectExtend,
        HttpService,
        I18NService,
        CommonService,
        AuthService,
        GlobalMonitorService,
        HelperService,
    ]
})
export class CommonModule {
  constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
    throwIfAlreadyLoaded(parentModule, 'CommonModule');
  }
}
