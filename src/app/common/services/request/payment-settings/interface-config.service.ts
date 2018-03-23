import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 接口配置数据源
 *  Created by zll on 2018/3/5
 */
@Injectable()
export class InterfaceConfigService {
    constructor(private http:HttpService){
    }

    /**
     * 接口配置列表查询地址
     *
     * String  code            接口编号
     String  name        接口名称
     String  agencyCode  受理机构编号
     */
  public static ITERFACE_LIST_URL = '/paymentapiconfig/searchforpage';


    /**
     * 所属机构查询地址
     */
    public static BANKNO_URL = '/paymentBankOrgan/page';


    /**
     * 新增接口配置
     * String  code            接口编号
     String  name        接口名称
     String  appid       第三方提供的APPID
     String  ally            支付接口商户号
     String  partkey     支付接口签名KEY
     String  agencyCode  受理机构编号
     String  appKey      签名密钥
     String  subAppid        子APPID
     String  tradeChannel    支付通道
     String  subAlly     子商户号
     * @param params
     * @returns {Observable<any>}
     */
    addIngerfaceConfig(params): Observable<any> {
        return this.http.post('/paymentapiconfig/save', params);
    }


    /**
     * 修改接口配置
     * String  code            接口编号
     String  name        接口名称
     String  appid       第三方提供的APPID
     String  ally            支付接口商户号
     String  partkey     支付接口签名KEY
     String  agencyCode  受理机构编号
     String  appKey      签名密钥
     String  subAppid        子APPID
     String  tradeChannel    支付通道
     String  subAlly     子商户号
     * @param params
     * @returns {Observable<any>}
     */
    editIngerfaceConfig(params): Observable<any> {
        return this.http.post('/paymentapiconfig/edit', params);
    }


    /**
     * 查询接口配置详情
     * @param params
     * @returns {Observable<any>}
     * String  code            接口编号
     */
    detailIngerfaceConfig(params): Observable<any> {
        return this.http.post('/paymentapiconfig/findbykey', params);
    }


    /**
     * 删除接口配置
     * @param params
     * @returns {Observable<any>}
     * String  code            接口编号
     */
    delIngerfaceConfig(params): Observable<any> {
        return this.http.post('/paymentapiconfig/delete', params);
    }
}
