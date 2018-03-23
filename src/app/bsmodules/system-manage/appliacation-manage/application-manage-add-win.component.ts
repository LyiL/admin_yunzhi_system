import { Component, Input, OnInit } from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../common/services/request/common.service";
import {HelperService} from "../../../common/services/helper.service";
import {Observable} from "rxjs/Observable";
import {CommonEnum} from "../../../common/enum/common.enum";
import {I18NService} from "../../../common/i18n/i18n.service";
import {AppManageService} from "../../../common/services/request/system-manage/application-manage.service";
import {AppManageModel} from "../../../common/model/system-manage/application-manage/application-manage.model";

/**
 * 新增|编辑应用弹窗
 * Created by lyl on 2018/3/1
 */
@Component({
    selector: 'application-manage-add-win',
    templateUrl: './application-manage-add-win.component.html',
    providers:[AppManageService]
})
export class AppManageAddWinComponent implements OnInit {
    public isLoading:boolean = false;//按钮加载效果
    public appManageForm: FormGroup;
    public model: AppManageModel = new AppManageModel();
    constructor(private subject: NzModalSubject,
                protected fb: FormBuilder,
                public commonDB:CommonService,
                public helper:HelperService,
                public message: NzMessageService,
                protected i18n:I18NService,
                protected appManageService: AppManageService
    ) {}

    ngOnInit() {
        this.appManageForm = this.fb.group({
            appCode:[this.model.appCode, [Validators.required]],//应用id
            appname:[this.model.appname, [Validators.required]],//应用名称
            description:[this.model.description],//描述
        });
        /**
         * 根据id判断是进入新增还是编辑模式
         */
        // if(this.model && this.model['id']) {
        //     this.appManageService.loadAppManageInfo({ id: this.model['id']})
        //         .subscribe( res => {
        //             if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
        //                 this.model = res[CommonEnum.SERVER_DATA_KEY];
        //             }
        //         })
        // }

    }


    /**
     *保存
     */
    onSave() {
        this.isLoading = true;
        this.model.signkey = this.model.appCode;
        if (this.appManageForm.valid) {
            this.appManageService.updateAppManageInfo(this.model).subscribe(res => {
                this.isLoading = false;
                if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk');
                } else {
                    this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.appManageForm.controls[ name ];
    }
}
