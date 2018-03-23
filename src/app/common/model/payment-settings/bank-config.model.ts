import {BaseModel} from "../base.model";

/**
 * 银行配置表单字段模板
 * Created by hux on 2018/3/1
 */
export class BankConfigModel extends BaseModel{
    public id:number; // 主键id
    public name:string; // 银行名称
    public bankDigitalCode:string; // 服务电话
    public bankEnCode:string; // 银行编码
    public descript:string; // 备注

    constructor() {
        super();
    }
}
