import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from "../../../net/http.service";
import {CommonEnum} from '../../../enum/common.enum';

/**
 * create by hsz 2018-3-2
 * 安全证书请求数据源
 */
@Injectable()
export class safetyCertificateDbService{
  constructor(private http: HttpService) {

  }

    /**
     * 获取银行列表
     * @type {string}
     */
    public  static  BANK_INFO_URL = "/paymentbankinfo/searchforpage";
    /**
     * 查询支付接口列表
     *  String bankNo 受理机构编号
     String transId 支付类型
     * @type {string}
     */
    public  static  TRANSID_INFO_URL = "/paymenttradeapi/searchforpage";


    /**
     * 查询安全证书列表
     *  String  certType  证书类型,0-清算中心 1-商户
     String  thridMerchantNo  第三方商户号
     */
    public  static  SAFETY_CERT_LIST_URL = "/paymentgatewaycert/findbypage";

    /**查询受理机构支付中心列表
     * String  bankNo  受理机构编号  *
     String  name  支付中心名称
     String  settleParty  结算方
     */
    public  static  PAYCENTER_LIST_URL = "/paymentcenter/findbypage";




  /**新增安全证书
   *  String  certType  证书类型,0-清算中心 1-商户  *
   int  centerId  支付中心iD  *
   String  thridMerchantNo  第三方商户号
   String  certPwd  证书密码  *
   String  refundUserId  退款用户名
   String  refundUserPwd  退款密码
   *
   *
   */
  safCertAdd(params:any):Observable<any>{
    return this.http.post('/paymentgatewaycert/add',params);
  }
  /**
   * 删除安全证书
   *String  id  证书主键  *
   *
   */
  Del(params:any):Observable<any>{
      return this.http.post('/paymentgatewaycert/del',params);
  }

  /**上传安全证书
   *
   * @param params
   * @returns {Observable<any>}
   * MultipartFile 安全证书内容(文件流)
   */

  upload(id):Observable<any>{
    return this.http.post('/paymentgatewaycert/upload/'+ id);
  }
    /**
     * 下载安全证书
     * String id 安全证书主键ID
     *
     */
    download(params:any):Observable<any>{
        return this.http.download('/paymentgatewaycert/download',params);
    }

}
