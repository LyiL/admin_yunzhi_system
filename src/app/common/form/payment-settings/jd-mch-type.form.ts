import {BaseForm} from '../base.form';

/**
 * 京东商户类型查询表单字段
 * Created by hux on 2018/3/1
 */
export class JDMchTypeForm extends BaseForm{
    public typeName:string; //类型名称
    public typeNo:string;   //类型编号
    public categoryNo:string;   //关联商户行业类别编号

    constructor() {
        super();
    }
}
