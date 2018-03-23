import {BaseModel} from "../base.model";

/**
 * 支付接口表单字段模板
 * Created by hux on 2018/3/1
 */
export class PaymentInterfaceModel extends BaseModel{
    public id:number; // 主键id
    public transType:string; // 支付接口名称
    public transId:string; // 代码
    public apiType:number; // 类型
    public bankNo:string; // 所属机构编号
    public bankName:string; // 所属机构名称

    constructor() {
        super();
    }
}
