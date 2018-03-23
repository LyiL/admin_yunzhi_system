import {BaseModel} from '../../base.model';

/**
 * 模块管理
 * Created by lyl on 2018/3/1
 */
export class ModuleManageModel extends BaseModel{
    public id: number;//编号,编辑时必传
    public appId: string;//应用ID*
    public parent: number;//父级
    public pTitle: string; //父模块名称（添加）
    public name: string;//模块名
    public ordered: number;//排序
    public iconClass: string;//菜单图标样式
    public module: string;//模块(地址)
    public roles: string;//菜单角色分配,都个角色使用,号分割
    public appCode: string;//编码（模块源码）
    public isShow: number;//是否显示
    public isSysMenu: number;//默认不为系统菜单
}
