
import {BaseForm} from '../base.form';
/**
 * create by hsz 2018-3-2
 * 安全证书配置列表查询form
 */
export class safetyCertificateForm extends BaseForm{

    public certType: string; //证书类型,0-清算中心 1-商户
    public thridMerchantNo:string; //第三方商户号
    constructor(){
        super();
    }

}
