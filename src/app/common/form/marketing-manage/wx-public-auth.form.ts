import {BaseForm} from '../base.form';

/**
 * 公众号授权查询表单字段
 * Created by hux on 2018/3/1
 */
export class WxPublicAuthForm extends BaseForm{
    public name:string; // 公众账号名称
    public nickName:string; // 授权方昵称

    constructor() {
        super();
    }
}
