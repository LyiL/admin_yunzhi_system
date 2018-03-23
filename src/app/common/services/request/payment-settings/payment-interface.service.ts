import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 支付接口数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class PaymentInterfaceService {
    constructor(private http:HttpService){
    }

    /**
     * 支付接口列表查询地址
     */
    public static PAYMENT_INTERFACE_LIST_URL = '/paymenttradeapi/searchforpage';

    /**
     * 支付接口全部查询地址
     */
    public static PAYMENT_INTERFACE_ALL_URL = '/paymenttradeapi/findall';

    /**
     * 新增支付接口
     * @param params {
     *  transType:string 支付接口名称 *
     *  transId:string 接口代码 *
     *  apiType:number 类型 *
     *  bankNo:string 所属机构 *
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/paymenttradeapi/save',params);
    }

    /**
     * 修改支付接口
     * @param params {
     *  id:number 主键id *
     *  transType:string 支付接口名称 *
     *  transId:string 代码 *
     *  apiType:number 类型 *
     *  bankNo:string 所属机构 *
     * }
     * @return {Observable<any>}
     */
    update(params:any):Observable<any>{
        return this.http.post('/paymenttradeapi/edit',params);
    }

    /**
     * 查看支付接口详情
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/paymenttradeapi/findbykey',params);
    }
}
