import {BaseModel} from "../base.model";

/**
 * 支付渠道表单字段模板
 * Created by hux on 2018/3/1
 */
export class PaymentChannelModel extends BaseModel{
    public routeChannelName:string; // 支付渠道名称
    public routeChannelCode:string; // 支付渠道编码

    constructor() {
        super();
    }
}
