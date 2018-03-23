import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * IP白名单数据源服务请求
 *  Created by zll on 2018/3/5
 */
@Injectable()
export class IpWhiteListService{
    constructor(private http:HttpService){
    }

    /**
     * IP白名单列表查询地址
     *
     * String  policyName      策略名称
     String  policyNo            策略编号
     */
    public static IP_WHITE_LIST_URL = '/paymentiptable/page';


    /**
     * 新增IP白名单信息
     * String  policyNo        策略编号*
     String  policyName  策略名称*
     String  ips         策略的IP,IP根据;分割存储*
     */
    addIpWhiteList(params): Observable<any> {
        return this.http.post('/paymentiptable/add', params);
    }


    /**
     * 修改IP白名单信息
     * String  policyNo        策略编号*
     String  policyName  策略名称*
     String  ips         策略的IP,IP根据;分割存储*
     * @param params
     * @returns {Observable<any>}
     */
    editIpWhiteList(params): Observable<any> {
        return this.http.post('/paymentiptable/update', params);
    }


    /**
     * 查询IP白名单详情
     * String  policyNo  策略编号
     */
    detailIpWhiteList(params): Observable<any> {
        return this.http.post('/paymentiptable/detail', params);
    }


    /**
     * 删除IP白名单详情
     * String  policyNo  策略编号
     * String  id      策略编号
     */
    delIpWhiteList(params): Observable<any> {
        return this.http.post('/paymentiptable/delete', params);
    }

    dealerInfo(params): Observable<any> {
        return this.http.post('/query/dealerInfo', params);
    }
}
