import {Component, OnInit, ViewChild} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {NzModalService, NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonService} from "../../../../common/services/request/common.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {FieldModal} from "../../../../common/model/system-manage/field.model";
import {FieldService} from "../../../../common/services/request/system-manage/field.service";

/**
 * Created by cty on 2018/3/1.
 * 领域管理新增/编辑
 */

@Component({
    selector: 'field-edit-win',
    templateUrl: './field-edit-win.component.html',
    providers: [FieldService]
})
export class FieldEditWinComponent implements OnInit {

    public _transId = {};           // 获取通道类型需要的参数
    public isLoad: boolean = false; // 按钮loading效果

    public model: FieldModal = new FieldModal();
    public fieldFormGroup: FormGroup;
    @ViewChild('intoListTable') public intoListTable: SimpleTableComponent;

    constructor(public helper: HelperService,
                public i18n: I18NService,
                public modal: NzModalService,
                public msg: NzMessageService,
                public fb: FormBuilder,
                public CommonDB: CommonService,
                public _modal: NzModalSubject,
                public FieldDB: FieldService)
    {}


    /**
     * 受理机构配置
     * @type {{title: (string | any); url: string; isAjax: boolean; reqReName: {pi: string; ps: string}; resReName: {list: string; total: string; pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public bankCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('config.bank.title'),
        url:CommonService.ORGNO_URL,
        params: {status: 1},
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('config.bank.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('config.bank.orgName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('config.bank.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('config.bank.orgName'),
            index:'name'
        }]
    };


    ngOnInit() {
        this.fieldFormGroup = this.fb.group({
            id: [this.model.id],                                        // id号
            name: [this.model.name, [Validators.required]],             // 领域名称
            hosts:[this.model.hosts, [Validators.required]],            // 主域名
            descript: [this.model.descript, [Validators.required]],     // 领域描述
            bankNo: [this.model.bankNo, [Validators.required]],         // 受理机构编号
            bankName: [this.model.bankName],                            // 受理机构名称
            appId: [this.model.appId, [Validators.required]]            // 应用ID
        });
    }

    /**
     * 受理机构选择事件
     */
    public bankSelect(params: any) {
        this.model.bankNo = params['orgNo'];
        this.model.bankName = params['name'];
    }

    /**
     * 新增/编辑保存
     */
    onSubmit(value) {
        this.isLoad = true;

        this.FieldDB.editField(this.model).subscribe(res => {
            if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this._modal.destroy('onOk');
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoad = false;
        })
    }


    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.fieldFormGroup.controls[ name ];
    }
}


