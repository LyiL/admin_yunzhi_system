
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-3-1
 * 新增或编辑支付配置表单
 */
export class payCfgAddModel extends BaseModel{
    public id:number;//支付中心id
    public bankNo: string; //受理机构编号
    public name: string; //支付中心名称
    public settleParty:number;//结算方
    public tradeType: number; //支付模式  0:清分模式,1:受理模式,2:通道模式
    public feeRuleType: number; //手续费配置(‰)
    public bankCard: string; //银行卡号
    public bankCardName: string; //开户姓名
    public bankName: string; //银行名称
    public settleType: number; //结算类型 0-收单机构清分 1-第三方清分
    public settleRate: string; //成本费率
    public chaProfitType: number; //分润类型 0-为不分润 1-为参与分润
    public otherCenterBank: string; //关联受理机构
    public otherCenterId: string; //关联支付中心
    public otherCenterBankName: string; //关联受理机构
    public otherCenterName: string; //关联支付中心
    public descript: string; //备注
    constructor() {
        super();
    }

}
