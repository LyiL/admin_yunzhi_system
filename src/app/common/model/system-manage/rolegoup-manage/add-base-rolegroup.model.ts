import {BaseForm} from "../../../form/base.form";

/**
 * 新增角色组
 * Created by zll on 2018/3/2
 */
export class AddBaseRolegroupModel extends BaseForm{
    public id:number    //主键ID
    public roleName:string;  //角色组名称
    public description:string; // 描述
    public parentIds:string;   // 父级id (编辑角色时必传)
    public appId:string;   // 领域id APPID
    public orgNo:string;   // 所属机构
    public orgName:string;   // 所属机构
    public rolecode:string; //角色组编码   (新增角色组时必传)
    // constructor(){
    //     super();
    // }
}
