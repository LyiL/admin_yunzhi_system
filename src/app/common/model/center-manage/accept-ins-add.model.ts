
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-2-26
 * 新增或编辑受理机构表单
 */
export class acceptInsAddModel extends BaseModel{
    public orgId:number;//机构ID
    public organName: string; //机构名称
    public bankShortName: string; //机构简称
    public ruleType:string;//手续费计算
    public preEnName: string; //机构缩写
    public techRate: string; //服务手续费(‰)
    public expCls: string; //结算行内导出
    public contName: string; //联系人姓名
    public expOutCls: string; //结算行外导出
    public phone: string; //联系人电话
    public cashSyncSrv: string; //结算服务导出
    public email: string; //联系邮箱
    public settleCycle: string; //结算周期
    public address: string; //详细地址
    public remark: string; //机构备注
    public expPubCls: string; //结算对公导出
    public expPriCls: string; //结算对私导出
    public alipayMchSync: number; //支付宝同步配置支付中心ID
    public qqMchSync: number; //QQ同步配置支付中心ID
    public wechatMchSync: number; //微信同步配置支付中心ID
    constructor() {
        super();
    }
}
