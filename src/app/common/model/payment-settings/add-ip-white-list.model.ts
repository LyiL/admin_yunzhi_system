/**
 * 新增IP白名单信息模板
 *  * Created by zll on 2018/3/1
 */
import {BaseModel} from "../base.model";

export class AddIpWhiteListModel extends BaseModel{
    public policyNo: string; //策略编号
    public policyName: string; //策略名称
    public ips: string; //策略的IP,IP根据;分割存储
    public apiCode:string  //接口编号
    public mchid:string  //所属商户ID
    public name:string  //所属商户名

}
