
import {BaseModel} from '../base.model';

/**
 * create by hsz 2018-2-28
 * 受理机构审核状态表单
 */
export class examstateModel extends BaseModel{
    public status: string;//状态: 0-待审核 1-通过 2-未通过 3-冻结 4-接口冻结  *
    public orgNo: string;// 机构编号
    public orgId:any;//机构ID  *
    constructor() {
        super();
    }
}
