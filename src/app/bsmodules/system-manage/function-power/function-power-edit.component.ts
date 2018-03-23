import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {FunctionPowerModel} from "../../../common/model/system-manage/function-power.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonEnum} from "../../../common/enum/common.enum";
import {ReuseTabService, SearchWindowConfig} from "@delon/abc";
import {FunctionPowerService} from "../../../common/services/request/system-manage/function-power.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

/**
 * Created by cty on 2018/3/1.
 * 功能权限管理列表页
 */
@Component({
    selector:'function-power-edit',
    templateUrl:'./function-power-edit.component.html',
    providers: [CommonService, FunctionPowerService]
})
export class FunctionPowerEditComponent implements OnInit {

    public isLoad: boolean; // 加载中
    public _appId = {};     // 功能组参数

    public model: FunctionPowerModel = new FunctionPowerModel();
    public FunctionPowerFormGroup: FormGroup;

    constructor(public helper: HelperService,
                public i18n: I18NService,
                protected modalService: NzModalService,
                public fb: FormBuilder,
                public FunctionPowerDB: FunctionPowerService,
                public menuService: MenuService,
                public router: Router,
                public msg: NzMessageService)
    {}

    ngOnInit() {
        this.FunctionPowerFormGroup = this.fb.group({
            id: [this.model.id],
            appId: [this.model.appId, [Validators.required]],               // APPID
            authgroup: [this.model.authgroup, [Validators.required]],       // 功能组
            authcode: [this.model.authcode, [Validators.required]],         // 功能编码
            actionName: [this.model.actionName, [Validators.required]],     // 功能名称
            actionPath: [this.model.actionPath, [Validators.required]],     // 功能路径
            orderBy: [this.model.orderBy, [Validators.minLength(5), this.numberValidator]],       // 排序
            actionParm: [this.model.actionParm],                            // 请求包含的参数
        })

        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];
            this.model = params['model'];
        }
    }

    /**
     * 功能组控件配置
     */
    public authgroupTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('funcPower.searchWin.title'),
        url:FunctionPowerService.GET_TREE_URL,
        params: this._appId,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('funcPower.searchWin.functionList')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('funcPower.searchWin.functionList'),
            index:'name'
        }]
    };

    /**
     *  获取响应式表单项
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.FunctionPowerFormGroup.controls[name];
    }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            var req = /^[0-9]*$/;//整数
            // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }


    /**
     * 功能组选择事件
     * @param val
     */
    public onSelectFunction(val: any) {
        this.model.authgroup = val['name'];
        this.model.treeId = val['id'];
    }


    /**
     * 功能组查询前事件
     * @param val
     */
    public onAuthgroupBefore(val:any) {
        if(this.helper.isEmpty(this.model.appId)) {
            // 请先输入APPID
            this.msg.warning(this.i18n.fanyi('funcPower.searchWin.hint'));
            return false;
        }

        return true;
    }


    // 获取APPID赋值给功能组搜索参数
    modelChange(val) {
        this._appId['appId'] = val;
}

    /**
     *  返回
     */
    onBack() {
        this.helper.navigate('/admin/system/functionpowerlist', this.i18n.fanyi('funcPower.listPage.titie'), null);
    }


    /**
     * 保存
     */
    onSubmit() {
        this.isLoad = true;

        this.FunctionPowerDB.addOrEdit(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/system/functionpowerlist', this.i18n.fanyi('funcPower.listPage.titie'), null, true);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }


}
