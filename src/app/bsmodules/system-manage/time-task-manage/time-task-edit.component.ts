import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {TimeTaskModel} from "../../../common/model/system-manage/time-task.model";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {TimeTaskService} from "../../../common/services/request/system-manage/time-task.service";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * Created by cty on 2018/3/1.
 * 定时任务新增/编辑
 */

@Component({
    selector:'time-task-edit',
    templateUrl:'./time-task-edit.component.html',
    providers: [CommonService, TimeTaskService]
})
export class TimeTaskEditComponent implements OnInit{

    public isLoad: boolean = false;     // 按钮加载中效果
    public isDisabled: boolean = false; // 是否只读

    public model: TimeTaskModel = new TimeTaskModel();
    public timeTaskFormGroup: FormGroup;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                public fb: FormBuilder,
                public menuService: MenuService,
                public router: Router,
                public TimeTaskDB: TimeTaskService,
                public msg: NzMessageService
    ){}

    ngOnInit() {
        this.timeTaskFormGroup = this.fb.group({
            id: [this.model.id, [Validators.required]],                     // 任务编码
            taskName: [this.model.taskName, [Validators.required]],         // 任务名称
            groupName: [this.model.groupName, [Validators.required]],       // 分组名称
            cronExp: [this.model.cronExp, [Validators.required]],           // 执行时间
            cronDesc: [this.model.cronDesc, [Validators.required]],         // 时间描述
            targetClass: [this.model.targetClass, [Validators.required]],   // 执行目标类
            outsideParams: [this.model.outsideParams],                      // 外部参数
            descript: [this.model.descript]                                 // 任务描述
        })

        // 获取路由参数
        let menu = this.menuService.getUrlByMenu(this.router.url);

        // 判断是否是进入编辑页
        if(menu && menu['params']) {
            let params = menu['params'];

            if(params && params['id']) {
                this.TimeTaskDB.getDetail({id: params['id']}).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this.isDisabled = true;
                    }
                })
            }
        }
    }

    /**onChangeControl
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.timeTaskFormGroup.controls[name];
    }


    /**
     * 返回
     */
    public onBack() {
        this.helper.navigate('/admin/system/timetasklist', this.i18n.fanyi('timeTask.listPage.title'), null);
    }


    /**
     * 保存
     */
    public onSubmit() {
        this.isLoad = true;

        this.TimeTaskDB.addOrEdit(this.model).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/system/timetasklist', this.i18n.fanyi('timeTask.listPage.title'), null, true);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }

            this.isLoad = false;
        })
    }


}
