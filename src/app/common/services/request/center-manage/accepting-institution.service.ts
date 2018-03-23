import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from "../../../net/http.service";
import {CommonEnum} from '../../../enum/common.enum';

/**
 * create by hsz 2018-2-26
 * 受理机构请求数据源
 */
@Injectable()
export class AcceptingInstitutionListDbService  {
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
     *受理机构列表
     * @type {string}
     *  String  orgNo  机构编号
     String  name  机构名称
     String  preEnName  私有云前缀
     int  status  状态:待审核、正常、冻结
     String  notOrgNo  不显示的机构编号
     */
  public  static  ACCEPT_INSTITUTION_LIST_URL = "/paymentBankOrgan/page";

    /**
     *查询受理机构的商户号列表
     *  String  bankNo  归属受理机构编号  *
     String  companion  商户号
     */
    public  static  MCHCFG_LIST_URL = "/thridpartner/page";

    /**查询受理机构支付中心列表
     * String  bankNo  受理机构编号  *
     String  name  支付中心名称
     String  settleParty  结算方
     */
    public  static  PAYCENTER_LIST_URL = "/paymentcenter/findbypage";


    /**查询对账管理列表
     *  String  bankNo  受理机构编号
     String  companion  第三方商户号
     int  billType  对账单类型 0-本地数据 1-远程下载
     */
    public  static  BILL_LIST_URL = "/paymentthridbill/searchforpage";

    /**查询关联受理机构列表
     *  String  orgNo  受理机构编号
     String  name  受理机构名称
     */
    public  static  OTHERBANK_LIST_URL = "/paymentBankOrgan/page";
    /**查询关联支付中心列表
     String  bankNo  受理机构编号
     String  name  支付中心名称
     */
    public  static  OTHERCENTER_LIST_URL = "/paymentcenter/findcenterlist";


  /**新增受理机构
   * String  organName  机构名称  *
   String  bankShortName  机构缩写  *
   String  preEnName  机构简称  *
   String  contName  联系人  *
   String  phone  联系电话  *
   String  email  联系邮箱  *
   String  techRate  技术服务手续费(‰)  *
   int  ruleType  手续费计算,0:四舍五入,1:单个支付类型汇总四舍五入  *
   String  expCls  结算行内导出
   String  expOutCls  结算行外导出
   String  cashSyncSrv  结算服务导出
   String  settleCycle  渠道结算周期(T+1)
   String  expPubCls  对公导出类
   String  expPriCls  对私导出类
   String  address  详细地址  *
   String  remark  机构备注
   *
   *
   */
  acceptInsAdd(params:any):Observable<any>{
    return this.http.post('/paymentbankorgan/save',params);
  }
  /**
   * 编辑受理机构
   *int  orgId  机构ID  *
   String  organName  机构名称  *
   String  bankShortName  机构缩写  *
   String  preEnName  机构简称  *
   String  contName  联系人  *
   String  phone  联系电话  *
   String  email  联系邮箱  *
   String  techRate  技术服务手续费(‰)  *
   int  ruleType  手续费计算,0:四舍五入,1:单个支付类型汇总四舍五入  *
   String  expCls  结算行内导出
   String  expOutCls  结算行外导出
   String  cashSyncSrv  结算服务导出
   String  settleCycle  渠道结算周期(T+1)
   String  expPubCls  对公导出类
   String  expPriCls  对私导出类
   String  address  详细地址  *
   String  remark  机构备注
   int  alipayMchSync  支付宝同步配置支付中心ID
   int  qqMchSync  QQ同步配置支付中心ID
   int  wechatMchSync  微信同步配置支付中心ID
   *
   */
  acceptInsUpdate(params:any):Observable<any>{
      return this.http.post('/paymentbankorgan/update',params);
  }
  /**
   * 根据ID查询受理机构
   *
   *    String  orgId  机构编号
   */
  acceptInsById(params:any):Observable<any>{
    return this.http.post('/paymentbankorgan/findbyid',params);
  }
  /**审核受理机构
   *    int  orgId  机构ID  *
   String  orgNo  机构编号
   int  status  状态: 0-待审核 1-通过 2-未通过 3-冻结 4-接口冻结  *
   * @param params
   * @returns {Observable<any>}
   */
  onExamineorg(params:any):Observable<any>{
    return this.http.post('/paymentbankorgan/examineorg',params);
  }
    /**重置密码
     *   String  organNo  机构编号  *
     String  domainId  领域ID
     * @param params
     * @returns {Observable<any>}
     */
    resetPwd(params:any):Observable<any>{
        return this.http.post('/paymentbankorgan/resetpwd',params);
    }
    /**创建默认服务商和代理商
     *   int  orgId  组织机构ID  *
     * @param params
     * @returns {Observable<any>}
     */
    createDefaultChan(params:any):Observable<any>{
        return this.http.post('/paymentbankorgan/createdefaultchan',params);
    }
    /**加受理机构商户号
     *   String  bankNo  归属受理机构编号  *
     String  companion  商户号  *
     String  companionName  商户名称  *
     String  payAccountName  支付账户名称
     String  payAccountCardno  支付账户号
     String  exportClass  导出实体类
     */
    mchSave(params:any):Observable<any>{
        return this.http.post('/thridpartner/save',params);
    }
    /**编辑受理机构商户号
     *  String  bankNo  归属受理机构编号  *
     String  companion  商户号  *
     String  companionName  商户名称  *
     String  payAccountName  支付账户名称
     String  payAccountCardno  支付账户号
     String  exportClass  导出实体类
     */
    mchUpdate(params:any):Observable<any>{
        return this.http.post('/thridpartner/update',params);
    }
    /**根据ID查询第三方商户号
     *  int id 第三方商户号主键ID  *
     */
    mchById(params:any):Observable<any>{
        return this.http.post('/thridpartner/findbyid',params);
    }
    /**删除受理机构商户号
     *  int id 第三方商户号主键ID  *
     */

    mchDelete(params:any):Observable<any>{
        return this.http.post('/thridpartner/delete',params);
    }
    /**新增受理机构的结算账户
     *     String  name  账户名称  *
     String  type  账户类型 0-个人 1-企业  *
     String  acntIdentity  开户身份证号
     String  bankCode  银行编码  *
     String  bankName  银行名称  *
     String  bankCardno  银行卡号  *
     String  subbranchName  开户支行名称  *
     String  subbanrchCode  联行号  *
     String  cardType  行内账户  1-行内 0-行外  *
     String  optionType  结算账户类型 1 - 结算账户 2-技术服务费账户
     */
    bankAccountSave(params:any):Observable<any>{
        return this.http.post('/bankaccount/save',params);
    }
    /**新增受理机构的结算账户
     *     String  name  账户名称  *
     String  type  账户类型 0-个人 1-企业  *
     String  acntIdentity  开户身份证号
     String  bankCode  银行编码  *
     String  bankName  银行名称  *
     String  bankCardno  银行卡号  *
     String  subbranchName  开户支行名称  *
     String  subbanrchCode  联行号  *
     String  cardType  行内账户  1-行内 0-行外  *
     String  optionType  结算账户类型 1 - 结算账户 2-技术服务费账户
     */
    bankAccountUpdate(params:any):Observable<any>{
        return this.http.post('/bankaccount/update',params);
    }
    /**查询受理机构的结算账户
     *       int  acntId  结算账户主键ID *
     int  settleType  结算账户类型 1 - 结算账户 2-技术服务费账户
     */
    searchAccount(params:any):Observable<any>{
        return this.http.post('/bankaccount/searchaccount',params);
    }

    /**新增受理机构支付中心
     * String  bankNo  受理机构编号  *
     String  name  支付中心名称  *
     String  settleParty  结算方  *
     String  tradeType  支付模式  0:清分模式,1:受理模式,2:通道模式  *
     String  feeRuleType  手续费配置  *
     String  bankCard  银行卡号
     String  bankCardName  开户姓名
     String  bankName  银行名称
     String  settleType  结算类型 0-收单机构清分 1-第三方清分
     String  settleRate  成本费率
     String  chaProfitType  分润类型 0-为不分润 1-为参与分润
     String  otherCenterBank  关联受理机构
     String  otherCenterId  关联支付中心
     String  descript  备注
     */
    payCenterAdd(params:any):Observable<any>{
        return this.http.post('/paymentcenter/add',params);
    }
    /**新增受理机构支付中心
     *String  id  支付中心的主键ID  *
     String  bankNo  受理机构编号  *
     String  name  支付中心名称  *
     String  settleParty  结算方  *
     String  tradeType  支付模式  0:清分模式,1:受理模式,2:通道模式  *
     String  feeRuleType  手续费配置  *
     String  bankCard  银行卡号
     String  bankCardName  开户姓名
     String  bankName  银行名称
     String  settleType  结算类型 0-收单机构清分 1-第三方清分
     String  settleRate  成本费率
     String  chaProfitType  分润类型 0-为不分润 1-为参与分润
     String  otherCenterBank  关联受理机构
     String  otherCenterId  关联支付中心
     String  descript  备注
     */
    payCenterModify(params:any):Observable<any>{
        return this.http.post('/paymentcenter/modify',params);
    }

    /**查看受理机构支付中心详情
     *    String  id  支付中心的主键ID  *
     */
    payCenterById(params:any):Observable<any>{
        return this.http.post('/paymentcenter/findbyid',params);
    }

    /**设置支付中心启用禁用
     *    int  id  支付中心的主键ID  *
     int  isDeleted  状态标识(0：禁用，1：启用)  *
     */
    pcDisable(params:any):Observable<any>{
        return this.http.post('/paymentcenter/enabledisable',params);
    }
    /**根据支付中心Id查询查询退款策略
     *int  centerId  支付中心ID  *
     */
    pmByCenterId(params:any):Observable<any>{
        return this.http.post('  /paymentrefundlimit/findbycenterid',params);
    }
    /**新增退款策略
     *    int  centerId  支付中心ID  *
     int  limitDayRange  允许退款天数(支持退款天数范围,0表示当天退款)  *
     int  singleRefundFee  单笔退款金额限制  *
     int  dayRefundFee  当日退款金额限制  *
     int  dayRefundCount  当日退款笔数限制  *
     int  state  启用状态，0-未启用 1-启用
     String  updateRemark  修改时的备注
     */
    pmRefundAdd(params:any):Observable<any>{
        return this.http.post(' /paymentrefundlimit/add',params);
    }
    /**修改退款策略
     *    String  limitNo  退款策略编号  *
     int  centerId  支付中心ID  *
     int  limitDayRange  允许退款天数(支持退款天数范围,0表示当天退款)  *
     int  singleRefundFee  单笔退款金额限制  *
     int  dayRefundFee  当日退款金额限制  *
     int  dayRefundCount  当日退款笔数限制  *
     int  state  启用状态，0-未启用 1-启用
     String  updateRemark  修改时的备注
     */
    pmRefundModify(params:any):Observable<any>{
        return this.http.post('/paymentrefundlimit/modify',params);
    }
    /**根据ID查询支付中心的支付类型
     *    int  centerId  支付中心ID  *
     */
    tradeTypeById(params:any):Observable<any>{
        return this.http.post('/paymenttradetype/findbyid',params);
    }

    /**添加支付中心的支付类型
     *    String  bankNo  受理机构编号  *
     int  centerId  支付中心ID  *
     String  transId  支付类型  *
     String  transType  支付类型名称  *
     String  appid  APPID(第三方提供的appid)
     String  companion  父商户号(支付接口商户号)  *
     String  signkey  签名密钥
     String  refundId  退款账户
     String  refundPwd  退款密码
     String  centerPattern  支付模式：0-清分模式 1-受理模式 2-通道模式  *
     String  currency  币种
     String  appKey  第三方提供的appkey
     String  subAppid  子APPID
     String  tradeChan  支付通道  *
     Strinf  subCompanion  子商户号
     String  callbackUrl  回调地址(页面跳转地址)
     String  notifyUrl  通知地址(通知转发地址)
     String  wxOauthAppid  微信授权APPID
     */
    tradeTypeAdd(params:any):Observable<any>{
        return this.http.post('/paymenttradetype/add',params);
    }

    /**修改支付中心的支付类型
     *   String  bankNo  受理机构编号  *
     int  centerId  支付中心ID  *
     String  transId  支付类型  *
     String  transType  支付类型名称  *
     String  appid  APPID(第三方提供的appid)
     String  companion  父商户号(支付接口商户号)  *
     String  signkey  签名密钥
     String  refundId  退款账户
     String  refundPwd  退款密码
     String  centerPattern  支付模式：0-清分模式 1-受理模式 2-通道模式  *
     String  currency  币种
     String  appKey  第三方提供的appkey
     String  subAppid  子APPID
     String  tradeChan  支付通道  *
     Strinf  subCompanion  子商户号
     String  callbackUrl  回调地址(页面跳转地址)
     String  notifyUrl  通知地址(通知转发地址)
     String  wxOauthAppid  微信授权APPID
     */
    tradeTypeModify(params:any):Observable<any>{
        return this.http.post('/paymenttradetype/modify',params);
    }

    /**新增对账单配置
     *    String  bankNo  受理机构编号  *
     String  companion  第三方商户号  *
     int  billType  对账单类型 0-本地数据 1-远程下载
     String  downClass  下载类
     String  classParams  下载类对应的参数
     String  parseClass  解析对账单的类
     int  downBegin  允许下载开始时间
     int  downEnd  允许下载结束时间
     */
    billSave(params:any):Observable<any>{
        return this.http.post('/paymentthridbill/save',params);
    }
    /**编辑对账单配置
     *    int  id  主键  *
     String  bankNo  受理机构编号  *
     String  companion  第三方商户号  *
     int  billType  对账单类型 0-本地数据 1-远程下载
     String  downClass  下载类
     String  classParams  下载类对应的参数
     String  parseClass  解析对账单的类
     int  downBegin  允许下载开始时间
     int  downEnd  允许下载结束时间
     */
    billEdit(params:any):Observable<any>{
        return this.http.post('/paymentthridbill/edit',params);
    }
    /**删除对账单配置
     *    int  id  主键  *
     */
    billDelete(params:any):Observable<any>{
        return this.http.post('/paymentthridbill/delete',params);
    }
    /**根据主键查询账单配置
     *    int  id  主键  *
     */
    billById(params:any):Observable<any>{
        return this.http.post('/paymentthridbill/findbykey',params);
    }

}
