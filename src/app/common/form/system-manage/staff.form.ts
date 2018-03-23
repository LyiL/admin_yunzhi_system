import {BaseForm} from "../base.form";

/**
 * Created by cty on 2018/3/1.
 * 员工管理表单
 */

export class StaffForm extends BaseForm {
    public userName: string;    // 用户名
    public realName: string;    // 员工姓名
    public isEnabled: string;   // 使用状态
}
