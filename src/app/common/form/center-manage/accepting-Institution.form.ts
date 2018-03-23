
import {BaseForm} from '../base.form';
/**
 * create by hsz 2018-2-26
 * 受理机构列表查询form
 */
export class acceptingInstitutionForm extends BaseForm{

    public name: string;    //机构名称
    public orgNo: string;    //机构编号
    public preEnName: string;    //私有云前缀
    public status: string;    //状态:待审核、正常、冻结
    public notOrgNo: string;    //不显示的机构编号
    constructor(){
        super();
    }

}
