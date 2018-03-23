/**
 *  角色功能权限列表字段
 *  Created by zll on 2018/3/2
 * @author hsz
 */


import {BaseModel} from "../../base.model";

export class AddRolegroupFunModel extends BaseModel{

    public id:number;   //主键ID
    public appId:string;  //领域id
    public rolecode:string;  //组织机构编号
    public nodeIds:Array<number> = new Array<any>(); //功能菜单编号集合 *


    // constructor() {
    //     super();
    // }
}
