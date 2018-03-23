
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-2-28
 * 新增或编辑对账单配置表单
 */
export class AccountCfgAddModel extends BaseModel{
    public id:number;// 主键  *
    public companion: string; // 第三方商户号  *
    public billType: number; //对账单类型 0-本地数据 1-远程下载
    public downClass: string; //下载类
    public classParams: string; //下载类对应的参数
    public parseClass: string; //解析对账单的类
    public downBegin: number; //允许下载开始时间
    public downEnd: number; //允许下载结束时间
    public bankNo: string; //受理机构编号
    constructor() {
        super();
    }

}
