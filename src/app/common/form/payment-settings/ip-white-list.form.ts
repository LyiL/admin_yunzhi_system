import {BaseForm} from '../base.form';

/**
 * IP白名单查询表单字段
 * Created by zll on 2018/3/2
 */
export class IpWhiteListForm extends BaseForm{
    public policyNo:string;//编号
    public policyName:string;//名称
    constructor(){
        super();
    }
}
