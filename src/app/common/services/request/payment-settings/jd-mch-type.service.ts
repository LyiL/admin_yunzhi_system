import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 京东商户类型数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class JDMchTypeService {
    constructor(private http:HttpService){
    }

    /**
     * 京东商户类型列表查询地址
     */
    public static JD_MCH_TYPE_LIST_URL = '/paymentjdmchtype/searchforpage';

    /**
     * 新增京东商户类型
     * @param params {
     *  parent:string 父级类型编号
     *  typeName:string 类型名称 *
     *  typeNo:string 类型编号 *
     *  categoryNo:string 关联商户行业类别编号
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/paymentjdmchtype/save',params);
    }

    /**
     * 修改京东商户类型
     * @param params {
     *  id:number 主键 *
     *  parent:string 父级类型编号
     *  typeName:string 类型名称 *
     *  typeNo:string 类型编号 *
     *  categoryNo:string 关联商户行业类别编号
     * }
     * @return {Observable<any>}
     */
    update(params:any):Observable<any>{
        return this.http.post('/paymentjdmchtype/update',params);
    }

    /**
     * 删除京东商户类型
     * @param params {
     *  id:number 主键 *
     * }
     * @return {Observable<any>}
     */
    delete(params:any):Observable<any>{
        return this.http.post('/paymentjdmchtype/delete',params);
    }

    /**
     * 查看京东商户类型详情
     * @param params {
     *  id:number 主键 *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/paymentjdmchtype/searchbykey',params);
    }
}
