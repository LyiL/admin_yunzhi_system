import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {SYSTEM_LOG_ROUTES} from "./system-log.routes";
import {LoginLogComponent} from "./loginlog-list/loginlog-list.component";
import {OperationlogListComponent} from "./operationlog-list/operationlog-list.component";

/**
 * 系统日志模块
 * Created by zll on 2018/3/1
 */
@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(SYSTEM_LOG_ROUTES)
    ],
    declarations:[
        LoginLogComponent,
        OperationlogListComponent
    ],
    entryComponents: []
})
export class SystemLogModule{

}
