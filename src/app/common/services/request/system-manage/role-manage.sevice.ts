import {Injectable} from "@angular/core";

import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";
import {Observable} from "rxjs/Observable";


/**
 * 角色管理服务请求地址
 * * * Created by zll on 2018/3/5
 */
@Injectable()
export class RoleManageSevice{


    constructor(private http: HttpService) {

    }
    /**
     * 角色管理列表数据地址
     *  String  roleName  角色名称无所需参数
     * @type {string}
     */
    public  static ROLE_MANAGE_LLIST_URL='/roleAction/findByPage';


    /**
     * 加载角色基础信息
     * Integer  id  主键id *
     */
    loadRoleInfo(id:number):Observable<any>{
        return this.http.post('/roleAction/findById',{id:id});
    }

    /**
     * 删除角色
     *   id:number  // 编号   *
     */
    loadRoleDel(params:any):Observable<any>{
        return this.http.post('/roleAction/del',params);
    }

    /**
     * 获取角色可继承角色组(仅自身平台)
     *
     */
    loadGetExtends():Observable<any>{
        return this.http.post('/roleAction/getExtends');
    }

    /**
     * 新增或编辑角色组
     * @param params ：RoleAddManageModel
     * @returns {Observable<any>}
     * String roleName;      //角色名/角色组名     *
     String description;   // 描述            *
     String parentIds;     // 父级id (新增角色时必传)
     String appId;         // 领域id                *
     String orgNo;         // 组织机构编号
     String rolecode;      ///角色编码/角色组编码   (新增角色组时必传)*
     */
    saveRoleInfo(params:any){
        let url = '/roleAction/add';
        if(params && params['id']){
            url = '/roleAction/modify';
        }
        return this.http.post(url,params);
    }

    /**
     * 获得角色功能权限列表
     *  roleId :string  角色主键     *
     *  appId :string   领域id       *
     *  organNo:string 组织机构编号 *
     *  parentRoleId:number  角色父级ID  *
     *
     */
    loadGetAllFunc(params:any):Observable<any>{
        return this.http.post('/roleAction/getAllFunc',params);
    }


    /**
     * 获得角色菜单权限列表
     * String      roleId          角色主键     *
     String      appId           领域id       *
     String      organNo         组织机构编号 *
     String      subAppid        子应用编码
     Integer     parentRoleId    角色父级ID
     */
    loadAllNode(params:any):Observable<any>{
        return this.http.post('/roleAction/getAllNode',params);
    }


    /**
     * 保存关联功能权限
     *   String      rolecode        角色编码     *
     String      appId           领域id       *
     String      orgNo           组织机构编号 *
     Integer[]   nodeIds;        权限编号集合 *
     */
    loadSaveRoleFunc(params:any):Observable<any>{
        return this.http.post('/roleAction/savaRoleFunc',params);
    }

    /**
     * 保存菜单权限
     *  String      id          角色主键     *
     String      rolecode    角色编码     *
     String      appId       领域id       *
     String      orgNo       组织机构编号 *
     Integer[]   nodeIds     菜单编号集合 *
     */
    loadSaveAllotNode(params:any):Observable<any>{
        return this.http.post('/roleAction/allotNode',params);
    }


}
