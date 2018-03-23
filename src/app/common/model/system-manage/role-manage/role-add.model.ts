
import {BaseForm} from "../../../form/base.form";

/**
 * 新增角色表单字段
 * Created by zll on 2018/3/2
 * @author hsz
 * @date
 */
export class addRoleBaseForm extends BaseForm{
    public id:number;    //编号
    public roleName:string;  //角色名/角色组名
    public description:string; // 描述
    public parentIds:number;   // 父级id (编辑角色时必传)
    constructor(){
        super();
    }
}
