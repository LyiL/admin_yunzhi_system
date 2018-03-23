import {AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DynamicStepsService, ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {MenuService, ModalHelper} from "@delon/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StaffModel} from "../../../../common/model/system-manage/staff.model";
import {Router} from "@angular/router";
import {StaffService} from "../../../../common/services/request/system-manage/staff.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {HttpService} from "../../../../common/net/http.service";

/**
 * Created by cty on 2018/3/1.
 * 员工管理角色分配
 */

@Component({
    selector: 'allot-role',
    templateUrl: './allot-role.component.html',
    providers: [StaffService]
})
export class AllotRoleComponent implements OnInit, AfterContentChecked {

    public isLoad: boolean;         // 加载中
    public disable: boolean;        //定按钮是否显示字
    public roles:Array<any> = [];   //角色组数据字段

    public allotRoleFormGroup: FormGroup;
    public model: StaffModel = new StaffModel();

    constructor(
        public fb: FormBuilder,
        public menuService: MenuService,
        public router: Router,
        protected dynamicStepsService:DynamicStepsService,
        public staffDB: StaffService,
        public msg: NzMessageService,
        public helper: HelperService,
        public i18n: I18NService,
        public changeDetectorRef:ChangeDetectorRef,
        public reuseTabService: ReuseTabService
    ) {}


    ngOnInit() {

        this.allotRoleFormGroup = this.fb.group({
            id: [this.model.id, [Validators.required]],
            roleIds: [this.model.roleIds, [Validators.required]],
        });

        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params: any;
        if (menu && menu['params']) {
            // 编辑
            params = menu['params'];

        } else {
            // 新增
            params = this.dynamicStepsService.getStepByInstance(0)['params'];
        }

        if(params && params['id']) {
            this.model.id = params['id'];

        }


        // 获取角色
        this.staffDB.loadRoleList({parentIds: params['roleType'], username: params['userName']}).subscribe(res => {
            if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                let _roles = res[CommonEnum.SERVER_DATA_KEY];
                if(_roles instanceof Array) {
                    _roles.forEach((_roles) => {
                        _roles.label = _roles.value = _roles.roleName;
                    });
                    this.roles = _roles;
                }
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })

    }


    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }


    /**
     * 角色选择
     * @param role
     */
    public roleCheck(role) {
        let _roleIds = [];

        role.forEach(e => {
            if(e['checked']) {
                _roleIds.push(e['id']);
            }
        })
        this.model.roleIds = _roleIds;
    }

    /**
     * 按钮是否显示
     * @returns {number | boolean}
     */
    public hasDisabled(){
        let _roleIds = this.roles;
        let flag = false;
        if(_roleIds instanceof Array) {
            _roleIds.forEach((val)=>{
                if(val['checked']){
                    flag = true;
                }
            });
        }
        return this.model.id && !flag;
    }


    /**
     * 保存
     */
    public onSubmit() {
        this.isLoad = true;

        this.staffDB.allotRole(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/system/stafflist', this.i18n.fanyi('staff.listPage.title'), null, true);
            }else {
                this.msg.success(this.i18n.fanyi('default.hint.saveFail'));
            }
            this.isLoad = false;
        })
    }


    /**
     * 返回
     */
    public onBack() {
        this.helper.navigate('/admin/system/stafflist', this.i18n.fanyi('staff.listPage.title'), null, true);
    }
}
