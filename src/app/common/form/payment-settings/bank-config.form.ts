import {BaseForm} from '../base.form';

/**
 * 银行配置查询表单字段
 * Created by hux on 2018/3/1
 */
export class BankConfigForm extends BaseForm{
    public name:string; //银行名称
    public bankEnCode:string; //英文缩写

    constructor() {
        super();
    }
}
