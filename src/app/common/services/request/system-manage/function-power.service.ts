import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * Created by cty on 2018/3/1.
 * 功能权限管理接口
 */

@Injectable()
export class FunctionPowerService {
    constructor(public http: HttpService) {}

    /**
     * 列表接口
     * String  authcode;    //功能编码
     String  actionName;    //功能名称
     String  authgroup;     //功能组
     String  appId;         //APPID
     * @type {string}
     */
    public static FUNCTION_POWER_LIST_URL = '/permission/findlist';


    /**
     * 功能组接口
     * String  appId;   //应用ID*
     Integer  id;       //编号
     String  name;      //功能名称
     * @type {string}
     */
    public static GET_TREE_URL = '/sysfunctree/gettree';


    /**
     * 新增/编辑
     * String  appId;       //APPID*
     String  authgroup;     //功能组*
     String  authcode;      //功能编码*
     String  actionName;    //功能名称*
     String  actionPath;    //功能路径*
     Integer  orderBy;      //排序
     String  actionParm;    //请求包含的参数
     Integer  treeId;       //树id
     * @returns {Observable<any>}
     */
    public addOrEdit(params: any) {
        if(params && params['id']) {
            return this.http.post('/permission/update', params);
        }
        return this.http.post('/permission/add', params);
    }
}
