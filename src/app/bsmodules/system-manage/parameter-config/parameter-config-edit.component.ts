import {AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {ParameterModel} from "../../../common/model/system-manage/parameter.model";
import {Form, FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {CommonEnum} from "../../../common/enum/common.enum";
import {Observable} from "rxjs/Observable";
import {ParameterService} from "../../../common/services/request/system-manage/parameter.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {FileUploadComponent} from "@delon/abc";

/**
 * Created by cty on 2018/3/1.
 * 参数配置新增/编辑
 */
@Component({
    selector:'parameter-config-edit',
    templateUrl:'./parameter-config-edit.component.html',
    providers: [CommonService, ParameterService]
})
export class ParameterConfigEditComponent implements OnInit, AfterContentChecked{

    @ViewChild('fileUpload') fileUpload:FileUploadComponent;

    public isLoad: boolean = false;         // 加载中效果
    public isImgUpload: boolean = false;    // 图片上传是否隐藏

    public _confType: Observable<any>;      // 类型
    public model: ParameterModel = new ParameterModel();
    public parameterFormGroup: FormGroup;

    //文件上传控件配置
    public defFieldUploadSetting: any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.jpeg;.png;.gif;',
        // autoUpload: false
    };

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                public fb: FormBuilder,
                public msg: NzMessageService,
                public ParameterDB: ParameterService,
                public menuService:MenuService,
                public router:Router,
                public changeDetectorRef:ChangeDetectorRef
    ){
        this._confType = Observable.of(this.helper.getDictByKey('CFG_TYPE')); // 类型
    }

    ngOnInit(){
        this.parameterFormGroup = this.fb.group({
            keyCode: [this.model.keyCode, [Validators.required]],           // 配置项编码
            confName: [this.model.confName, [Validators.required]],         // 显示名称
            confType: [this.model.confType, [Validators.required]],         // 类型
            imgUpload: [this.model.imgUpload],                              // 图片上传
            moduleCode: [this.model.moduleCode, [Validators.required]],     // 分组
            value: [this.model.value, [Validators.required]],               // 值
            descript: [this.model.descript],                                // 配置项说明
            isShow: [this.model.isShow],                                    // 是否在页面显示
            domainId: [this.model.domainId],                                // 区域
        })

        // domainId如果不传，后台默认为0，后续可能需要调整这个值
        this.model.domainId = 0;

        let menu = this.menuService.getUrlByMenu(this.router.url); //路由参数
        if(menu && menu['params']) {
            let _params = menu['params'];

            this.ParameterDB.getDetail({id: _params['id']}).subscribe((res) => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] === CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.model = res[CommonEnum.SERVER_DATA_KEY];

                    if(this.model.confType != 'image') {
                        this.model.imgUpload = null;
                    }

                    this.model.imgUpload = this.model.value;
                }
            })
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
     * 图片上传选择事件
     * @param val
     */
    public onUpload(data: any) {
        if(data[CommonEnum.SERVER_STATUS_KEY] != CommonEnum.SERVER_STATUS_DATE_KEY){
            return;
        }

        let res = JSON.parse(data['response']);
        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            this.model.value = JSON.stringify(res['data']);
        }else {
            this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
        }
    }

    /**
     * 立即上传按钮点击事件
     */
    onSelectFile(){
        this.fileUpload.value = null;
        this.fileUpload.uploader.clearQueue(); // 清除上传文件队列
        this.fileUpload._onClick();
    }


    /**
     * 是否在页面显示
     */
    public isShowClick(val: any) {
        if(val && val == true) {
            this.model.isShow = 1;
        }else {
            this.model.isShow = 0;
        }
    }

    /**
     * 返回
     */
    public onBack() {
        this.helper.navigate('/admin/system/parameterlist', this.i18n.fanyi('parameter.listPage.title'), null);
    }


    /**
     * 保存
     */
    public onSubmit() {
        this.isLoad = true;

        this.ParameterDB.addOrEdit(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/system/parameterlist', this.i18n.fanyi('parameter.listPage.title'), null, true);
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
        return this.parameterFormGroup.controls[name];
    }

    /**
     * 根据某个条件判断某个参数是否为必填项
     * @param name
     * @returns {boolean}
     */
    public onChangeControl(name) {
        let _control = this.getFormControl(name);
        let imgControl = this.parameterFormGroup.controls['imgUpload'];
        if (imgControl && _control && _control['value'] == 'image') {
            this.isImgUpload = true;
            return true;
        }

        this.isImgUpload = false;
        return false;
    }

}
