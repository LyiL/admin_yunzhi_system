import {BaseModel} from "../../base.model";

/**
 * 新增|编辑应用管理
 * Created by lyl on 2018/3/1
 */
export class AppManageModel extends BaseModel{
  public id: number; //主键（编辑时传）
  public appCode: string; //应用ID *
  public appname: string; //应用名称 *
  public description: string; //描述
  public signkey: string; //密钥（值与appCode相同）
}
