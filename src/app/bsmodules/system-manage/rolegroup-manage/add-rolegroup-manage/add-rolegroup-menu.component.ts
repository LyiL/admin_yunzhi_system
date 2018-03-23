import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {NzMessageService} from "ng-zorro-antd";
import {DynamicStepsService, ReuseTabService} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {AddRolegorupMenuModel} from "../../../../common/model/system-manage/rolegoup-manage/add-rolegorup-menu.model";
import {RoleGroupManageService} from "../../../../common/services/request/system-manage/role-group-manage.service";



/**
 *新增关联菜单信息页
 * Created by zll on 2018/3/1
 */
@Component({
    selector: 'add-rolegroupmenpermission',
    templateUrl: 'add-rolegroup-menu.component.html',
    providers: [RoleGroupManageService]
})
export class AddRolegroupMenuComponent{
    public funcs: Array<any> = new Array<any>();   //接受关联菜单信息数据字段
    public model: AddRolegorupMenuModel = new AddRolegorupMenuModel();
    public paramas:any;    //接受路由参数或基本信息值
    public isLoading = false;  //按钮载入状态样式
    public _isLoading = false;  //按钮载入状态样式

    constructor(public fb: FormBuilder,
                private helper: HelperService,
                public roleGroupManageService: RoleGroupManageService,
                public i18n:I18NService,
                public _msg: NzMessageService,
                public dynamicStepsService:DynamicStepsService,
                public menuService:MenuService,
                public router:Router,
                private reuseTabService:ReuseTabService) {

    }



    ngOnInit() {

        let menu =this.menuService.getUrlByMenu(this.router.url);

        if(menu&&menu['params']['isEdit']){
            //let edit=menu['params'].isEdit; //是否编辑状态
            this.paramas=menu['params'];
            this.model=menu['params'];
        }
        else {
            this.paramas=this.dynamicStepsService.getStepByInstance(0)['params'];
            this.model=this.paramas;
        }

        /**
         * 联菜单信息数据获取
         */
        this.roleGroupManageService.loadAllNode(
            {roleId:this.paramas.rolecode,appId:this.paramas.appId,parentRoleId:this.paramas["parentIds"],organNo:this.paramas["orgNo"]})
            .subscribe(res => {
                if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    let data=res[CommonEnum.SERVER_DATA_KEY];
                    data.forEach((el)=>{
                        el.name=el.label;
                        el.children.forEach((val)=>{
                            val.name=val.label;
                            if(val.partialSelected){  //判断节点是否默认选中
                                val.checked=true;
                                el.halfChecked = true;     // 父级样式控制横显示
                            }
                        })
                        if (el.children.every(item => item.checked === true)) { //子级全选父级样式控制
                            el.checked = true;
                            el.halfChecked = false;
                        }
                    })
                    this.funcs=res[CommonEnum.SERVER_DATA_KEY];
                }else {
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }

            })
    }


    /**
     *
     * @param el checked 节点
     */
    onEvent(el){
        let funcIds = [];
        this.funcs.forEach((value)=>{
            // let nodePar=value.partialSelected;
            let nodePar=false;       //是否添加父节点id
            value['children'].forEach((val)=>{
                if(val['checked']){
                    funcIds.push(val.data['id']);
                    nodePar=true;
                }
            })
            if(nodePar){
                funcIds.push(value.data['id']);
            }
        });
        this.model.nodeIds = funcIds;
        // this.disable=JSON.stringify(this.model.nodeIds) === '[]'

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
     * 保存并下一步
     */
    onNextSetp(){
        this.isLoading=true;
        this.roleGroupManageService.loadSaveAllotNode(this.model).subscribe(_res=>{
            this.isLoading=false;
            if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                // alert('保存成功');
                this._msg.success(this.i18n.fanyi('RM.listPage.html.savesuc'));
                // ++this.rolemanaeSev.step;
                // this.dynamicStepsService.goStep(2);
                this.dynamicStepsService.nextStep();//下一步
            }else{
                this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 保存
     */
    _submitForm(){
        this._isLoading=true;
        if(this.model.nodeIds.length == 0){
            // alert('请选择角色菜单权限');
            this._msg.success(this.i18n.fanyi('RM.listPage.html.pleaserole'));
            return false;
        }
        this.roleGroupManageService.loadSaveAllotNode(this.model).subscribe(_res=>{
            this._isLoading=false;
            if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                // alert('保存成功');
                this._msg.success(this.i18n.fanyi('RM.listPage.html.savesuc'));
                this.helper.navigate('/admin/system/rolegrouplist',this.i18n.fanyi('roleGroup.listPage.html.title'),{},true);
            }else{
                this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }


    /**
     * 取消
     */
    back(){
        this.helper.navigate('/admin/system/rolegrouplist',this.i18n.fanyi('roleGroup.listPage.html.title'),{},true);
    }




}

