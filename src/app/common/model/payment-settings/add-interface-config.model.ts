/**
 * 新增接口配置信息模板
 *  * Created by zll on 2018/3/1
 */

import {BaseModel} from "../base.model";

export class AddInterfaceConfig extends BaseModel{
    public code: string; //接口编号
    public name: string; //接口名称
    public appid: string; //第三方提供的APPID
    public ally: string; //支付接口商户号
    public partkey: string; //签名密钥
    public agencyCode: string; //受理机构编号
    public appKey: string; //应用密钥
    public subAppid: string; //子APPID
    public tradeChannel: string; //支付通道
    public subAlly: string; //子商户号
    public organName:string; // 所属机构名称
}
