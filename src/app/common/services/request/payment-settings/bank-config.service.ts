import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 银行配置数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class BankConfigService {
    constructor(private http:HttpService){
    }

    /**
     * 银行配置查询地址（分页）
     */
    public static BANK_CONFIG_LIST_URL = '/paymentbankinfo/searchforpage';

    /**
     * 银行配置查询地址（不分页）
     */
    public static BANK_CONFIG_NOPAGE_URL = '/paymentbankinfo/searchbyproperty';

    /**
     * 银行配置全部查询地址
     */
    public static BANK_CONFIG_ALL_URL = '/paymentbankinfo/findall';

    /**
     * 新增银行配置
     * @param params {
     *  name:string 银行名称
     *  bankEnCode:string 银行编码
     *  bankDigitalCode:string 服务电话
     *  descript:string 备注
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/paymentbankinfo/save',params);
    }

    /**
     * 修改银行配置
     * @param params {
     *  id:number 主键id
     *  name:string 银行名称
     *  bankEnCode:string 银行编码
     *  bankDigitalCode:string 服务电话
     *  descript:string 备注
     * }
     * @return {Observable<any>}
     */
    update(params:any):Observable<any>{
        return this.http.post('/paymentbankinfo/edit',params);
    }

    /**
     * 删除银行配置
     * @param params {
     *  id:number 主键 *
     * }
     * @return {Observable<any>}
     */
    delete(params:any):Observable<any>{
        return this.http.post('/paymentbankinfo/delete',params);
    }

    /**
     * 查询银行配置详情
     * @param params {
     *  id:number 主键 *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/paymentbankinfo/findbykey',params);
    }
}
