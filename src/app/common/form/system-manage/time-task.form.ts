import {BaseForm} from "../base.form";

/**
 * Created by cty on 2018/3/1.
 * 定时任务表单
 */

export class TimeTaskForm extends BaseForm {
    public taskName: string;  // 定时任务名字
    public groupName: string; // 定时任务分组
}
