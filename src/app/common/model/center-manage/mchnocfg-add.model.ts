
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-2-28
 * 新增或编辑商户号表单
 */
export class mchNoCfgAddModel extends BaseModel{
    public id:number; //主键ID  *
    public companion: string; //商户号
    public companionName: string; //商户名称
    public exportClass:string;//导出实体类
    public payAccountCardno: string; //支付账户号
    public payAccountName: string; //支付账户名称
    public bankNo: string; //归属受理机构编号  *
    constructor() {
        super();
    }
}
