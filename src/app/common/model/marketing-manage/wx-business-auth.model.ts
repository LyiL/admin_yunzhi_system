import {BaseModel} from "../base.model";

/**
 * 微信业务授权表单字段模板
 * Created by hux on 2018/3/1
 */
export class WxBusinessAuthModel extends BaseModel{
    public id:number; // 主键id
    public authId:number; // 授权公众账号
    public authName:string; // 授权公众账号名称
    public organNo:string; // 机构编码
    public organName:string; // 机构名称
    public platId:number; // 授权平台编号
    public platName:string; // 授权平台名称
    public organOrMch:string; // 商户、机构、服务商

    constructor() {
        super();
    }
}
