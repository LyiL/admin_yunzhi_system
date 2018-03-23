
import {BaseForm} from '../base.form';
/**
 * create by hsz 2018-3-1
 * 对账单配置列表查询form
 */
export class accountCfgForm extends BaseForm{

    public bankNo: string;//受理机构编号
    public companion:string; //第三方商户号
    public billType:string;//对账单类型 0-本地数据 1-远程下载

    constructor(){
        super();
    }

}
