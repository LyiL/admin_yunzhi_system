import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";
import {ObjectExtend} from "ng-zorro-antd";

/**
 * 应用管理请求服务类
 * Created by lyl on 2018/3/1
 */
@Injectable()
export class AppManageService{
    constructor(private http:HttpService,private objectExtend:ObjectExtend){}
    /**
     *应用管理列表数据地址
     * String  appname;  //应用名称
     * String  appCode;  //应用程序编码
     */
    public static APPMANAGE_LIST_URL = '/system/findlist';
    /**
     *查询单条数据
     */
    loadAppManageInfo(param:any): any{

    }
    /**
     *新增或编辑应用管理
     * Integer  id;    //编号* 编辑时必传
     String  appCode;    //应用程序编码*
     String  appname;    //应用名称*
     String  description;    //描述
     */
    updateAppManageInfo(param:any): any{
        return this.http.post('/system/edit',param);
    }

    /**
     * 查询单个应用管理员
     *String  appId;    //应用ID*
     */
    findAdmin(params: any) {
        return this.http.post('/system/findsubjectuser',params);
    }

    /**
     * 添加管理员账号
     * String  appId;    //应用ID*
     String  realName;    //真实姓名*
     String  userName;    //用户名*
     String  userPwd;    //密码*
     */
    addAdmin(params: any){
        return this.http.post('/system/addsubjectuser',params);
    }

    /**
     * 编辑管理员信息
     * String  userName;    //用户名*
     String  userPwd;    //密码*
     */
    updateAdmin(params: any){
        return this.http.post('/system/updatepswuser',params);
    }

    /**
     *删除单条应用管理数据
     *Integer  id;    //编号
     */
    deleteAppManageInfo(params:any){
        return this.http.post('/system/delete',params);
    }

    /**
     * 加载模块管理信息(菜单树)
     * String  appId;  //应用ID
     */
    loadModuleTree(param:any):any{
        return this.http.post('/sysfunctree/searchtree',param);
    }

    /**
     * 添加应用模块
     * String  appId;  //应用ID*
     Integer  parent;    //父级
     String  name;    //模块名
     Integer  ordered;    //排序
     String  iconClass;  //菜单图标样式
     String  module;  //模块
     String  roles;   //菜单角色分配,都个角色使用,号分割
     String  appCode;    //编码
     Integer  isShow;  //是否显示
     Integer  isSysMenu;    //默认不为系统菜单
     */
    addModuleTree(param:any):any{
        return this.http.post('/sysfunctree/addtree',param);
    }

    /**
     * 编辑应用模块
     * Integer  id; //编号
     String  appId;  //应用ID*
     Integer  parent;    //父级
     String  name;    //模块名
     Integer  ordered;    //排序
     String  iconClass;  //菜单图标样式
     String  module;  //模块
     String  roles;   //菜单角色分配,都个角色使用,号分割
     String  appCode;    //编码
     Integer  isShow;  //是否显示
     Integer  isSysMenu;    //默认不为系统菜单
     */
    updateModuleTree(param:any):any{
        return this.http.post('/sysfunctree/updatetree',param);
    }

    /**
     * 删除应用模块
     * Integer  id; //编号
     */
    delModuleTree(param:any):any{
        return this.http.post('/sysfunctree/deletetree',param);
    }

}
