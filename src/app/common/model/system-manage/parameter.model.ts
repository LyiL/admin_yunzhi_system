import {BaseModel} from "../base.model";

/**
 * Created by cty on 2018/3/1/
 * 参数配置
 */

export class ParameterModel extends BaseModel {
    public id: number;
    public keyCode: string;     // 配置项编码
    public confName: string;    // 显示名称
    public confType: string;    // 类型
    public imgUpload: string;   // 图片上传
    public moduleCode: string;  // 分组
    public value: string;       // 值
    public descript: string;    // 配置项说明
    public isShow: number;      // 是否在页面显示
    public domainId: number;    // 区域

    constructor() {
        super();
    }

}
