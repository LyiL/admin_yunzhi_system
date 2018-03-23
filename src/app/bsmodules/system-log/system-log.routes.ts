/**
 * 系统日志路由
 * @type {Array}
 * Created by zll on 2018/3/1
 */
import {LoginLogComponent} from "./loginlog-list/loginlog-list.component";
import {OperationlogListComponent} from "./operationlog-list/operationlog-list.component";

export const SYSTEM_LOG_ROUTES = [
    {path: 'loginloglist', component: LoginLogComponent},     //登录日志模块
    {path: 'operationlog', component: OperationlogListComponent}, //操作日志模块
];


