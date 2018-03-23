import {BaseModel} from "../base.model";

/**
 * Created by lyl on 2018/3/2.
 * 功能权限配置
 */

export class WxDevPlatformModel extends BaseModel {
    public id: number; //编号,编辑时必填
    public organNo: string;       // 机构编号*
    public organName: string;   // 机构名称*
    public name: string;    // 公众账号名称*
    public type: number;     // 公众号类型(0:订阅号, 1:历史老账号升级的订阅好, 2:服务号)*
    public token: string;  // 标识*
    public appid: string;  // 公众号第三方平台APPID*
    public appsecret: string;  // 应用秘钥*
    public host: string;  // 主服务域名*
    public aesKey: string;  // 签名秘钥*
    public authHost: string;  // 授权域*
    public remark: string;  // 备注

    constructor() {
        super();
    }
}
