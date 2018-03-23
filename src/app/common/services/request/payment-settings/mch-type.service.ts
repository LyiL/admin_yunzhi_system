import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 商户类型数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class MchTypeService {
    constructor(private http:HttpService){
    }

    /**
     * 商户类型列表查询地址
     */
    public static MCH_TYPE_LIST_URL = '/paymentmchtype/searchforpage';

    /**
     * 查询商户类型
     * @param params {
     *  parent:string 父级类型
     *  name:string 类型名称
     *  categoryNo:string 类型编号
     * }
     * @returns {Observable<any>}
     */
    find(params:any):Observable<any>{
        return this.http.post('/paymentmchtype/findindustry',params);
    }

    /**
     * 查询商户类型详情
     * @param params {
     *  id:number 主键id *
     * }
     * @returns {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/paymentmchtype/findbykey',params);
    }

    /**
     * 新增商户类型
     * @param params {
     *  parent:string 父级类型编号
     *  name:string 类型名称 *
     *  categoryNo:string 类型编号 *
     *  alipayTypeno:string 支付宝类型编号
     *  wxTypeno:string 微信类型编号
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/paymentmchtype/add',params);
    }

    /**
     * 修改商户类型
     * @param params {
     *  id:number 主键 *
     *  parent:string 父级类型编号
     *  name:string 类型名称 *
     *  categoryNo:string 类型编号 *
     *  alipayTypeno:string 支付宝类型编号
     *  wxTypeno:string 微信类型编号
     * }
     * @return {Observable<any>}
     */
    update(params:any):Observable<any>{
        return this.http.post('/paymentmchtype/edit',params);
    }

    /**
     * 删除商户类型
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    delete(params:any):Observable<any>{
        return this.http.post('/paymentmchtype/delete',params);
    }
}
