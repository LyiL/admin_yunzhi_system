
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-3-1
 * 添加支付配置表单
 */
export class payCfgPlusModel extends BaseModel{
    public bankNo: string; //受理机构编号
    public centerId: number; //支付中心ID
    public transId:string;//支付类型
    public transType: string; //支付类型名称
    public appid: string; // APPID(第三方提供的appid)
    public companion: string; //父商户号(支付接口商户号)  *
    public signkey: string; //签名密钥
    public refundId: string; //退款账户
    public refundPwd: string; //退款密码
    public centerPattern: string; //支付模式：0-清分模式 1-受理模式 2-通道模式  *
    public currency: string; //币种
    public appKey: string; //第三方提供的appkey
    public subAppid: string; //子APPID
    public tradeChan: string; //支付通道
    public subCompanion: string; //子商户号
    public callbackUrl: string; // 回调地址(页面跳转地址)
    public notifyUrl: string; //通知地址(通知转发地址)
    public wxOauthAppid: string; //微信授权APPID
    constructor() {
        super();
    }

}
