import {BaseForm} from '../base.form';

/**
 * 京东商户类型查询表单字段
 * Created by hux on 2018/3/1
 */
export class MchTypeForm extends BaseForm{
    public parent:string;   //父级类型编号
    public name:string; //类型名称
    public categoryNo:string;   //类型编号

    constructor() {
        super();
    }
}
