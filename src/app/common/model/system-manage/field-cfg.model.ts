import {BaseModel} from "../base.model";

/**
 * Created by cty on 2018/3/1.
 * 领域配置管理
 */

export class FieldCfgModal extends BaseModel {
    public confCode: string;        // 配置项编码
    public confName: string;        // 显示名称
    public confType: string;        // 类型
    public imgUpload: string;       // 图片上传
    public confProperty: string;    // 配置项属性
    public confContent: string;     // 默认值
    public confDescript: string;    // 配置项说明
    public domainId: number;        // 领域ID

    constructor() {
        super();
    }
}
