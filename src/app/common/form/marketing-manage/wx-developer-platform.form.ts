import {BaseForm} from '../base.form';

/**
 * 微信开发者平台查询表单字段
 * Created by lyl on 2018/3/2
 */
export class WxDevPlatformForm extends BaseForm{
    public name:string; // 第三方平台名称
    public organNo:string; // 受理机构编号

    constructor() {
        super();
    }
}
