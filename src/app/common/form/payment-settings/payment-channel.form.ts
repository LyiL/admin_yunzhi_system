import {BaseForm} from '../base.form';

/**
 * 支付渠道查询表单字段
 * Created by hux on 2018/3/1
 */
export class PaymentChannelForm extends BaseForm{
    public routeChannelName:string;//支付渠道名称
    public routeChannelCode:string;//支付渠道编码

    constructor() {
        super();
    }
}
