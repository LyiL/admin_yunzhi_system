import {BaseForm} from "../base.form";

/**
 * Created by cty on 2018/3/1.
 * 领域管理表单
 */

export class FieldForm extends BaseForm {
    public name: string;        // 领域名称
    public bankName: string;    // 受理机构名称
    public bankNo: string;      // 受理机构编号
    public confName: string;    // 配置名称
    public confCode: string;    // 配置编码
    public confType: string;    // 配置类型
    public domainId: number;    // 领域id
}
