import {BaseModel} from "../base.model";

/**
 * 京东商户类型表单字段模板
 * Created by hux on 2018/3/1
 */
export class JDMchTypeModel extends BaseModel{
    public id:number; // 主键id
    public parent:string; // 父级类型编号
    public parentName:string; // 父级类型名称
    public typeName:string; // 类型名称
    public typeNo:string; // 类型编号
    public categoryNo:string; // 关联商户行业类别编号

    constructor() {
        super();
    }
}
