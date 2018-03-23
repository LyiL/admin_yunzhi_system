import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 支付渠道数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class PaymentChannelService {
    constructor(private http:HttpService){
    }

    /**
     * 支付渠道列表查询地址
     */
    public static PAYMENT_CHANNEL_LIST_URL = '/paymentchannel/findbypage';

    /**
     * 新增支付渠道
     * @param params {
     *  routeChannel:string 支付渠道名称 *
     *  routeChannelCode:string 支付渠道编码 *
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/paymentchannel/save',params);
    }

    /**
     * 修改支付渠道状态
     * @param params {
     *  id: number 主键 *
     *  state: number 启用状态（0:停用; 1:可用）
     * }
     * @returns {Observable<any>}
     */
    updateState(params:any):Observable<any>{
        return this.http.post('/paymentchannel/updatestate',params);
    }
}
