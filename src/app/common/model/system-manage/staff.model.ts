import {BaseModel} from "../base.model";

/**
 * Created by cty on 2018/3/1.
 * 员工管理
 */

export class StaffModel extends BaseModel {

    id: number;
    userName: string;       // 用户名
    userPwd: string;        // 密码
    userPwdc: string;       // 确认密码
    realName: string;       // 员工姓名
    phone: string;          // 联系电话
    roleIds: Array<number> = [];    // 分配角色

    constructor() {
        super();
    }
}
