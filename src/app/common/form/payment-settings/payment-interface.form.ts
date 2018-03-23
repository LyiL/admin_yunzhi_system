import {BaseForm} from '../base.form';

/**
 * 支付接口查询表单字段
 * Created by hux on 2018/3/1
 */
export class PaymentInterfaceForm extends BaseForm{
    public transType:string;    //支付接口名称
    public transId:string;      //代码
    public apiType:string;      //类型
    public bankNo:string;       //所属机构

    constructor() {
        super();
    }
}
