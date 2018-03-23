import {BaseForm} from '../base.form';

/**
 * 接口配置查询表单字段
 * Created by zll on 2018/3/2
 */
export class  InterfaceConfigForm extends BaseForm{
    public code:string;//接口编号
    public name:string;//接口名称
    public agencyCode:string;//所属机构
    constructor(){
        super();
    }
}
