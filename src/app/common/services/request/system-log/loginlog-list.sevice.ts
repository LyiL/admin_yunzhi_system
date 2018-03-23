import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * 登录日志服务请求地址
 * * * Created by zll on 2018/3/5
 */
@Injectable()
export class LoginlogListSevice{
    constructor(private http: HttpService) {
    }

    /**
     * 登录日志列表数据地址
     * @type {string}
     * String  userName  用户名
     String  domainId  领域ID
     String  loginTime  开始登录时间  格式:yyyy-MM-dd HH:mm:ss
     String  lastLoginAt  结束登录时间  格式:yyyy-MM-dd HH:mm:ss
     */
    public  static LOGING_LIST_URL='/SystemLoginLog/findByPage';
}
