import {BaseForm} from "../base.form";

/**
 * Created by cty on 2018/3/1.
 * 参数配置表单
 */

export class ParameterForm extends BaseForm {
    public confName: string;    // 显示名称
    public keyCode: string;     // 配置项编码
    public moduleCode: string;  // 模块编码（分组）
}
