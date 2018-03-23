import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 微信业务授权数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class WxBusinessAuthService {
    constructor(private http:HttpService){
    }

    /**
     * 微信业务授权列表查询地址
     */
    public static WX_BUSINESS_AUTH_LIST_URL = '/authorizerref/pagingquery';

    /**
     * 授权第三方平台查询地址
     */
    public static PLATID_URL = '/wechatthdplat/pagingquery';

    /**
     * 授权公众账号查询地址
     */
    public static AUTHID_URL = '/authorizer/pagingquery';

    /**
     * 新增/或编辑微信业务授权
     * @param params {
     *  id:number 主键id 编辑时必填
     *  authId:number 授权公众账号 *
     *  authName:string 授权公众账号名称 *
     *  organNo:string 机构编码 *
     *  organName:string 机构名称 *
     *  platId:number 授权平台编号 *
     *  platName:string 授权平台名称 *
     *  organOrMch:string 商户或机构 *
     * }
     * @return {Observable<any>}
     */
    save(params:any):Observable<any>{
        return this.http.post('/authorizerref/save',params);
    }

    /**
     * 删除微信业务授权
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    delete(params:any):Observable<any>{
        return this.http.post('/authorizerref/del',params);
    }

    /**
     * 查询微信业务授权详情
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/authorizerref/findbyid',params);
    }
}
