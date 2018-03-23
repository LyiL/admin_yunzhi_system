import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * 登录日志服务请求地址
 *  Created by zll on 2018/3/5
 */
@Injectable()
export class OperationlogListSevice{
    constructor(private http: HttpService) {
    }

    /**
     * 登录日志列表数据地址
     * String  userName  用户名
     String  createdTime  开始操作时间  格式:yyyy-MM-dd HH:mm:ss
     String  lastCreated  结束操作时间  格式:yyyy-MM-dd HH:mm:ss
     * @type {string}
     */
   // public  static LOGING_LIST_URL='/SystemOperationLog/findByPage';
   public  static LOGING_LIST_URL='/systemoperationlog/findbypage';
}
