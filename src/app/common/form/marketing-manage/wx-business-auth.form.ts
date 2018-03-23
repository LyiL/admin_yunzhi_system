import {BaseForm} from '../base.form';

/**
 * 微信业务授权查询表单字段
 * Created by hux on 2018/3/1
 */
export class WxBusinessAuthForm extends BaseForm{
    public authName:string; // 授权公众账号
    public organNo:string; // 受理机构编号

    constructor() {
        super();
    }
}
