import {BaseModel} from "../base.model";

/**
 * Created by cty on 2018/3/1.
 * 功能权限配置
 */

export class FunctionPowerModel extends BaseModel {
    public id: number;
    public treeId: number;
    public appId: string;       // APPID
    public authgroup: string;   // 功能组
    public authcode: string;    // 功能编码
    public actionName: string;  // 功能名称
    public actionPath: string;  // 功能路径
    public orderBy: number;     // 排序
    public actionParm: string;  // 请求包含的参数

    constructor() {
        super();
    }
}
