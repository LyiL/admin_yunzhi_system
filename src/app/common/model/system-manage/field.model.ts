import {BaseModel} from "../base.model";

/**
 * Created by cty on 2018/3/1.
 * 领域管理
 */

export class FieldModal extends BaseModel {
    public id: number;              // 编辑时必填
    public name: string;            // 领域名称
    public hosts: string;           // 主域名
    public descript: string;        // 领域描述
    public bankNo: string;          // 受理机构编号
    public bankName: string;        // 受理机构名称
    public appId: string;           // 应用ID
    public domainId: number         // 领域ID

    constructor() {
        super();
    }
}
