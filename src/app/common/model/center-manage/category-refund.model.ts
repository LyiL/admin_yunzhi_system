
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-2-28
 * 新增或编辑退款策略表单
 */
export class categoryRefundModel extends BaseModel{
    public  limitNo:string;//  退款策略编号  *
    public centerId: number; //支付中心ID
    public limitDayRange: number; //允许退款天数(支持退款天数范围,0表示当天退款)  *
    public singleRefundFee:number;//单笔退款金额限制  *
    public dayRefundFee: number; //当日退款金额限制  *
    public dayRefundCount: number; //当日退款笔数限制  *
    public state: number; //启用状态，0-未启用 1-启用
    public updateRemark: string; //改时的备注

    constructor() {
        super();
    }
}
