import {BaseModel} from "../base.model";

/**
 * QQ商户类型表单字段模板
 * Created by hux on 2018/3/1
 */
export class QQMchTypeModel extends BaseModel{
    public id:number; // 主键id
    public categoryNo:string; // ULO商户类型编号
    public typeNo:string; // QQ商户类型编号
    public typeName:string; // QQ商户类型名称
    public parent:string; // QQ父商户类型编号

    constructor() {
        super();
    }
}
