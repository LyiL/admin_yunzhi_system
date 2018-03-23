import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {NzMessageService} from "ng-zorro-antd";
import {DynamicStepsService, ReuseTabService} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {RoleManageSevice} from "../../../../common/services/request/system-manage/role-manage.sevice";
import {RoleAddFuncpermissionModel} from "../../../../common/model/system-manage/role-manage/role-add-funcpermission.model";


/**
 *新增角色功能信息页
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'role-add-step2',
    templateUrl: 'role-add-funcpermission.component.html',
    providers: [RoleManageSevice]
})
export class RoleAddFuncpermissionComponent  {

    public model: RoleAddFuncpermissionModel = new RoleAddFuncpermissionModel(); //form实列
    public funcs: Array<any> = new Array<any>();     //功能信息数据源字段定义
    public isLoading = false;  //按钮载入状态样式

    public _checked:boolean=false;   //是否选中
    public _indete:boolean=false;    //全选横线是否显示

    constructor(public fb: FormBuilder,
                public helper: HelperService,
                public rolemanaeSev: RoleManageSevice,
                public i18n:I18NService,
                public _msg: NzMessageService,
                protected dynamicStepsService:DynamicStepsService,
                public menuService:MenuService,
                public router:Router,
                private reuseTabService:ReuseTabService) {

    }


    /**
     * 渲染数据
     */
    ngOnInit() {

        let menu =this.menuService.getUrlByMenu(this.router.url);
        if(menu&&menu['params']['isEdit']){
            // let edit=menu['params'].isEdit;  //是否编辑状态
            this.model=menu['params'];

        }else {
            this.model=this.dynamicStepsService.getStepByInstance(0)['params'];
        }
        // this.model=this.dynamicStepsService.getStepByInstance(0).params;
        this.model.nodeIds=[];
        this.rolemanaeSev.loadGetAllFunc({roleId:this.model.id,appId:this.model["appId"],parentRoleId:this.model["parentIds"],organNo:this.model["orgNo"]})
            .subscribe(res => {
                if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    let data=res[CommonEnum.SERVER_DATA_KEY];
                    data.forEach((val)=>{
                        val.children.forEach((el)=>{
                            el.label=el.value=el.name;
                        })
                    })
                    this.funcs=data;
                    // this.funcs.forEach((val)=>{   //默认是否选中父级样式显示
                    //     this.updateSingleChecked(val);
                    // })
                    this.updateSingleChecked(this.funcs); //默认是否选中父级样式显示
                    this.allC(this.funcs);
                }else {
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
    }


    /**
     * 全选
     */
    allFunc(event){
        if(event){
            let funcIds = [];
            this.funcs.forEach((value)=>{    //添加节点
                value.checked=true;
                this._indete=false;
                value.indeterminate=false;
                value['children'].forEach((val)=>{
                    val['checked']=true;
                    if(val['checked']){
                        funcIds.push(val['id']);
                    }
                })
            })
            this.model.nodeIds = funcIds;
        }else{
            this.funcs.forEach((value)=>{
                value.checked=false;
                this._indete=false;
                value['children'].forEach((val)=>{
                    val['checked']=false;
                    this.model.nodeIds=null;
                })
            })
        }
    }






    /**
     * 父级控制子级
     * @param el
     */
    updateAllChecked(el){
        el.indeterminate=false;
        if (el.checked) {
            el.children.forEach(item => item.checked = true);
        } else {
            el.children.forEach(item => item.checked = false);
        }
        this.allC(this.funcs);
    }

    /**
     * 子级控制父级
     * @param el
     */
    updateSingleChecked(val) {
        val.forEach((el)=>{
            let arr=el;
            if (el.children.every(item => item.checked === false)) {
                el.checked = false;
                el.indeterminate = false;
            } else if (el.children.every(item => item.checked === true)) {
                el.checked = true;
                el.indeterminate = false;
                this.allC(val);
            } else {
                el.indeterminate = true;
                this._checked=false;
            }
        })
        if(val.some(item => item.indeterminate === true)){
            this._indete=true;
        }
        if(val.every(item => item.indeterminate === false)&&val.every(item => item.checked === false)){
            this._indete=false;
        }
    }


    /**
     * 每个checked id值
     */
    public funcChecked(){
        let funcIds = [];
        let flag = false;
        this.funcs.forEach((value)=>{
            value['children'].forEach((val)=>{
                if(val['checked']){
                    funcIds.push(val['id']);
                }
            })
        });
        this.model.nodeIds = funcIds;
    }

    /**
     * 总checkbox样式控制
     * @param value
     */
    public allC(value){
        if (value.every(item => !!item.checked && !item.indeterminate)){
            this._checked=true;
            this._indete=false;
        }else if(value.some(item => !!item.indeterminate || !!item.checked)){
            this._checked=false;
            this._indete=true;
        } else{
            this._checked=false;
            this._indete=false;
        }
    }


    /**
     * 按钮是否显示
     * @returns {number | boolean}
     */
    public hasDisabled(){
        let flag = false;
        this.funcs.forEach((value)=>{
            value['children'].forEach((val)=>{
                if(val['checked']){
                    flag = true;
                }
            })
        });
        return this.model.id && !flag;
    }

    /**
     * 保存
     * @private
     */
    _submitForm(){
        this.isLoading=true;
        this.funcChecked();
        if(this.model.nodeIds.length == 0){
            // alert("请选择功能权限");
            this._msg.success(this.i18n.fanyi('RM.listPage.html.pleasefunc'));
            return false;
        }
        this.rolemanaeSev.loadSaveRoleFunc(this.model).subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                // alert("保存成功");
                this._msg.success(this.i18n.fanyi('RM.listPage.html.savesuc')); //返回列表页
                this.helper.navigate('/admin/system/rolemanagelist',this.i18n.fanyi('RM.listPage.html.title'),{},true);
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }


    /**
     * 返回
     */
    back(){
        this.helper.navigate('/admin/system/rolemanagelist',this.i18n.fanyi('RM.listPage.html.title'),{},true);
    }



}
