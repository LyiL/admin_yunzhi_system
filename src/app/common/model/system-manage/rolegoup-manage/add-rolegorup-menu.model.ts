import {BaseModel} from "../../base.model";
/**
 * 角色组菜单权限列表字段
 * Created by zll on 2018/3/2
 */
export class AddRolegorupMenuModel extends BaseModel{
    public id:number;     //主键id
    public rolecode:string;//角色编码
    public appId:string;//领域id
    public orgNo:string;//组织机构编号
    public subAppid:string;//子应用编码
    public parentRoleId:number;//角色父级ID
    public nodeIds:Array<number> = new Array<any>();  //菜单编号集合
}
