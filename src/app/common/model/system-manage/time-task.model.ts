import {BaseModel} from "../base.model";

/**
 * Created by cty on 2018/3/1.
 * 定时任务
 */

export class TimeTaskModel extends BaseModel {
    public id: string;              // 任务编码
    public taskName: string;        // 任务名称
    public groupName: string;       // 分组名
    public cronExp: string;         // 执行时间
    public cronDesc: string;        // 时间描述
    public targetClass: string;     // 执行目标类
    public outsideParams: string;   // 外部参数
    public descript: string;        // 任务描述

    constructor() {
        super();
    }
}
