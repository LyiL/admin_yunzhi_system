
import {BaseModel} from "../../base.model";
/**
 * 角色菜单权限列表字段
 * Created by zll on 2018/3/2
 */
export class RoleAddRolemenuModel extends BaseModel{
    public id:number;     //主键id
    public roleId:string;//角色主键
    public appId:string;//领域id
    public organNo:string;//组织机构编号
    public subAppid:string;//子应用编码
    public parentRoleId:number;//组织机构编号
    public nodeIds:Array<number> = new Array<any>();  //菜单编号集合
}


