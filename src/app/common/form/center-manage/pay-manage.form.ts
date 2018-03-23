
import {BaseForm} from '../base.form';
/**
 * create by hsz 2018-3-2
 * 受理机构支付中心配置列表查询form
 */
export class payManageForm extends BaseForm{

    public bankNo: string;//受理机构编号
    public name:string; //支付中心名称
    public settleParty:string;//结算方

    constructor(){
        super();
    }

}
