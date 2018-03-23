import {BaseForm} from "../base.form";

/**
 * Created by cty on 2018/3/1.
 * 功能权限管理表单
 */

export class FunctionPowerForm extends BaseForm {
    public authcode: string;    // 功能编号
    public actionName: string;  // 功能名称
    public authgroup: string;   // 功能分组
    public appId: string;       // APPID
}
