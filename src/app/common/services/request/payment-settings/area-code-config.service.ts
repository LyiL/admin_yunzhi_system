import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 地区码配置数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class AreaCodeConfigService {
    constructor(private http:HttpService){
    }

    /**
     * 地区码配置列表查询地址
     */
    public static AREA_CODE_CONFIG_LIST_URL = '/paymentarea/searchforpage';

    /**
     * 新增地区码配置
     * @param params {
     *  areaCode:string 地区码 *
     *  name:string 地区名称 *
     *  adCode:string 国际编码
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/paymentarea/save',params);
    }

    /**
     * 修改地区码配置
     * @param params {
     *  id:number 主键 *
     *  areaCode:string 地区码 *
     *  name:string 地区名称 *
     *  adCode:string 国际编码
     * }
     * @return {Observable<any>}
     */
    update(params:any):Observable<any>{
        return this.http.post('/paymentarea/update',params);
    }

    /**
     * 删除地区码配置
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    delete(params:any):Observable<any>{
        return this.http.post('/paymentarea/delete',params);
    }

    /**
     * 查询地区码配置详情
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/paymentarea/searchbyid',params);
    }
}
