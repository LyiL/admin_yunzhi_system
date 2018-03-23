import {Component, OnInit, ViewChild, EventEmitter} from "@angular/core";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {NzLocaleService, NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {FieldService} from "app/common/services/request/system-manage/field.service";
import {Observable} from "rxjs/Observable";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {FieldCfgModal} from "../../../../common/model/system-manage/field-cfg.model";
import {FileUploadComponent} from "@delon/abc";

/**
 * Created by cty on 2018/3/1.
 * 领域管理配置新增/编辑
 */

@Component({
    selector:'field-config-edit',
    templateUrl:'./field-config-edit.component.html',
    providers: [FieldService]
})
export class FieldConfigeditComponent implements OnInit{

    @ViewChild('fileUpload') fileUpload:FileUploadComponent;
    public fieldCfgFormGroup: FormGroup;
    public model: FieldCfgModal = new FieldCfgModal();

    public nzTitle: string;             // 新增/编辑标题
    public isLoad: boolean;             // 加载效果
    public isImgUpload: boolean;        // 图片上传根据类型选择过滤
    public _confType: Observable<any>;  // 类型
    public isRead: boolean;             // 是否只读
    public confCodeFlag: boolean;       // 配置项编码在新增时只读
    public isShow: boolean;             // 是否显示
    public _domainId: any;              // 保存领域管理传进来的编号(id)


    //文件上传控件配置
    public defFieldUploadSetting: any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.jpeg;.png;.gif;'
    };


    constructor(
        public msg: NzMessageService,
        public fb: FormBuilder,
        public helper: HelperService,
        public i18n: I18NService,
        public FieldDB: FieldService,
        public menuService: MenuService,
        public router: Router,
        public modal: NzModalSubject,
        public log:NzLocaleService
    ) {
        this._confType = Observable.of(this.helper.getDictByKey('DOMAIN_CFG_TYPE')); // 获取类型
    }

    ngOnInit() {
            this.fieldCfgFormGroup = this.fb.group({
            confCode: [this.model.confCode, [Validators.required]],             // 配置项编码
            confName: [this.model.confName, [Validators.required]],             // 显示名称
            confType: [this.model.confType, [Validators.required]],             // 类型
            imgUpload: [this.model.imgUpload],                                  // 图片上传
            confProperty: [this.model.confProperty],                            // 配置项属性
            confContent: [this.model.confContent],                              // 默认值
            confDescript: [this.model.confDescript, [Validators.required]],     // 配置项说明
            domainId: [this.model.domainId]                                     // 配置项说明
        })

        // 如果是新增的话，默认为0
        this.model['domainId'] = 0;

        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let _params = menu['params'];

            if(_params['id']) {
                // 点击编辑进入的领域配置管理

                this.FieldDB.getCfgDetail({id: _params['id']}).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.model = res[CommonEnum.SERVER_DATA_KEY];

                        this.model['domainId'] = _params['domainId'];

                        // 编辑进去的话，除了默认值，其余只读
                        if(this.model['domainId'] != 0) {
                            this.isRead = true;
                            this.confCodeFlag = true;
                        }

                        // 新增进去的话，只有配置项编码只读
                        if(_params['confCodeFlag']) {
                            this.isRead = false;
                            this.confCodeFlag = true;
                        }

                        this.model.imgUpload = this.model.confContent;
                    }
                })
            }else if (_params['_id']){
                // 点击表单按钮进入的领域配置管理

                this.model['domainId'] = _params['domainId'];
            }
        }
    }

    /**
     * 文件上传错误信息
     * @param data
     */
    public onFileUploadError(data){
        if(data && data[CommonEnum.SERVER_MES_KEY]){
            this.msg.warning(data[CommonEnum.SERVER_MES_KEY]);
        }
    }


    /**
     * 图片上传事件
     * @param val
     */
    public onUpload(data: any) {
        if(data[CommonEnum.SERVER_STATUS_KEY] != CommonEnum.SERVER_STATUS_DATE_KEY){
            return;
        }

        let res = JSON.parse(data['response']);
        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            let _data = res['data'];
            if(_data && _data['url']) {
                let _url = _data['url'];
                // 图片路径赋值给默认值
                this.model['confContent'] = _url;
            }
        }else {
            this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
        }
    }


    /**
     * 点击上传图片前事件
     */
    onSelectFile(){
        this.fileUpload.value = null;
        this.fileUpload.uploader.clearQueue(); // 清除上传文件队列
        this.fileUpload._onClick();
    }


    /**
     * 返回
     */
    public onBack(){
        // console.log('返回的this.model[\'domainId\']：：', this.model['domainId']);
        this.helper.navigate('/admin/system/fieldconfiglist', this.i18n.fanyi('fieldConfig.listPage.title'), {id: this.model['domainId']});
    }

    /**
     * 保存
     */
    public onSubmit() {
        this.isLoad = true;
        this.FieldDB.configSave(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/system/fieldconfiglist', this.i18n.fanyi('fieldConfig.listPage.title'), {id: this.model['domainId']});
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }

            this.isLoad = false;
        })
    }

    /**onChangeControl
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.fieldCfgFormGroup.controls[name];
    }

    /**
     * 根据某个条件判断某个参数是否为必填项
     * @param name
     * @returns {boolean}
     */
    public onChangeControl(name) {
        let _control = this.getFormControl(name);
        let imgControl = this.fieldCfgFormGroup.controls['imgUpload'];
        if (imgControl && _control && _control['value'] == 'image') {
            this.isImgUpload = true;
            return true;
        }

        this.isImgUpload = false;
        return false;
    }

}
