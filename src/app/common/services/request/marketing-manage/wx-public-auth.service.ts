import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 公众号授权数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class WxPublicAuthService {
    constructor(private http:HttpService){
    }

    /**
     * 公众号授权列表查询地址
     */
    public static WX_PUBLIC_AUTH_LIST_URL = '/authorizer/pagingquery';

    /**
     * 查询公众号授权详情
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/authorizer/findbyid',params);
    }

    /**
     * 公众号二维码上传
     * @param params {
     *  id:number 主键id *
     *  followCode:string 关注二维码 *
     * }
     * @returns {Observable<any>}
     */
    uploadFile(params:any):Observable<any>{
        return this.http.post('/authorizer/upload',params);
    }
}
