import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonEnum} from '../../../common/enum/common.enum';
import {I18NService} from '../../../common/i18n/i18n.service';
import {HelperService} from '../../../common/services/helper.service';
import {examstateModel} from '../../../common/model/center-manage/examstate.model';
import {Component, OnInit} from '@angular/core';
import {AcceptingInstitutionListDbService} from '../../../common/services/request/center-manage/accepting-institution.service';

/**
 * create by hsz 2018-2-26
 * 审核状态弹出框页面
 */
@Component({
    selector:'examstate-win',
    templateUrl:'./examstate-win.component.html',
    providers:[CommonEnum,AcceptingInstitutionListDbService]
})
export class ExamstateWinComponent implements OnInit{
    public model: examstateModel = new examstateModel();
    public StatusForm:FormGroup;
    public isLoadingOne = false; // loading
    /**
     *状态
     */
    public examStates: Array<any> = [];
    public orgId:any;  //接收父级传递过来的orgId
    public orgNo:any;//接收父级传递过来的orgNo
    public status:any;//接收父级传递过来的status

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public fb:FormBuilder,public AIDb:AcceptingInstitutionListDbService,
        public modal: NzModalSubject,
        public CommonEnum:CommonEnum,
        public msg: NzMessageService,
    ){}

    ngOnInit(){
        this.model.orgId = this.orgId;
        this.model.status = this.status;
        this.model.orgNo =this.orgNo;
        this.examStates = this.helper.getDictByKey('EXAMINE_STATUS');
        this.StatusForm = this.fb.group({
            status:[this.model['status'],Validators.required],
        })
    }

    /**
     * 提交状态修改
     * @public
     */
    _submitForm(){
        this.isLoadingOne = true;
        this.AIDb.onExamineorg(this.model).subscribe(res =>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(res[CommonEnum.SERVER_MES_KEY]);
                this.modal.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoadingOne = false;
        })
    }

}

