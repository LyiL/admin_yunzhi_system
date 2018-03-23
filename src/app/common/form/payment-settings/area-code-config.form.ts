import {BaseForm} from '../base.form';

/**
 * 地区码配置查询表单字段
 * Created by hux on 2018/3/1
 */
export class AreaCodeConfigForm extends BaseForm{
    public areaCode:string;//地区码
    public name:string;//地区名称
    public adCode:string;//国际编码

    constructor() {
        super();
    }
}
