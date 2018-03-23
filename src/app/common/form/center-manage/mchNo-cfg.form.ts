
import {BaseForm} from '../base.form';
/**
 * create by hsz 2018-2-27
 * 受理机构商户号配置列表查询form
 */
export class mchNoCfgForm extends BaseForm{

    public bankNo: string;//受理机构编号
    public companion:string; //商户号

    constructor(){
        super();
    }

}
