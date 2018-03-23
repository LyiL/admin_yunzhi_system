import {BaseForm} from '../base.form';

/**
 * 联行号管理查询表单字段
 * Created by zll on 2018/3/2
 */
export class  BankNumManageForm extends BaseForm{
    public cardBin:string;//银行卡号标识
    public fullName:string;//银行名称
    constructor(){
        super();
    }
}
