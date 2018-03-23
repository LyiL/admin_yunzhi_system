import {BaseModel} from "../base.model";

/**
 * 商户类型表单字段模板
 * Created by hux on 2018/3/1
 */
export class MchTypeModel extends BaseModel{
    public id:number; // 主键id
    public parent:string; // 父级类型编号
    public parentName:string; // 父级类型名称
    public name:string; // 类型名称
    public categoryNo:string; // 类型编号
    public alipayTypeno:string; // 支付宝类型编号
    public wxTypeno:string; // 微信类型编号

    constructor() {
        super();
    }
}
