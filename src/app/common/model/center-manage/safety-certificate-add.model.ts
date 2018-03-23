
import {BaseModel} from '../base.model';
/**
 * create by hsz 2018-3-2
 * 新增安全证书配置表单
 */
export class safetyCertificateAddModel extends BaseModel{

    public certType: string; //证书类型,0-清算中心 1-商户
    public thridMerchantNo:string; //第三方商户号
    public centerId:number; //支付中心iD  *
    public certPwd:string; //证书密码  *
    public refundUserId:string; //退款用户名
    public refundUserPwd:string; //退款密码
    constructor(){
        super();
    }


}
