/**
 * 新增联行号信息信息模板
 *  * Created by zll on 2018/3/1
 */
import {BaseModel} from "../base.model";

export class AddBankNumManageModel extends BaseModel{
    public cardBin: string; //银行卡号标识
    public cardLeg: string; //卡号长度
    public orgBankno: string; // 银行编号
    public smallName: string; //银行简称
    public fullName: string; //银行全称
    public bankLinkno: string; //银联号
    public id:number           //主键ID

}
