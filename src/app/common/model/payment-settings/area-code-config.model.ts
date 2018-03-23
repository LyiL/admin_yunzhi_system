import {BaseModel} from "../base.model";

/**
 * 地区码配置表单字段模板
 * Created by hux on 2018/3/1
 */
export class AreaCodeConfigModel extends BaseModel{
    public id:number; // 主键id
    public areaCode:string; // 地区码
    public name:string; // 地区名称
    public adCode:string; // 国际编码

    constructor() {
        super();
    }
}
