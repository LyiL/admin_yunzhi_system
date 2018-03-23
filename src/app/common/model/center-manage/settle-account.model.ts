
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-3-1
 * 结算账户设置表单
 */
export class settleAccountModel extends BaseModel{
    public name: string; //账户名称
    public type: string; //账户类型
    public acntIdentity: string; //开户身份证号
    public bankCardno: string; //银行卡号
    public subbanrchCode:string;//联行号
    public subbranchName:string;//开户行支行
    public cardType:string;//行内账户
    public acntId:number; //结算账户主键ID  *
    public optionType:number; //结算账户类型 1 - 结算账户 2-技术服务费账户
    public orgId:number;//受理机构ID  *
    public bankCode:string;//银行编号
    public bankName:string;//银行名称
    public accountId:number; //结算账户
    constructor() {
        super();
    }
}
