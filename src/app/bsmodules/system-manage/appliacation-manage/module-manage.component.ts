import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzLocaleService, NzMessageService, NzModalService, NzModalSubject, ObjectExtend} from "ng-zorro-antd";
import {CommonService} from "../../../common/services/request/common.service";
import {AppManageService} from "../../../common/services/request/system-manage/application-manage.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModuleManageModel} from "../../../common/model/system-manage/application-manage/module-manage.model";
import {TREE_ACTIONS, TreeModel, TreeNode} from "angular-tree-component";
import {NzTreeComponent} from "ng-tree-antd";
import {newClone} from "@delon/abc/utils/utils";

/**
 * 模块管理页面
 * Created by lyl on 2018/3/1
 */
@Component({
    selector:'module-manage',
    templateUrl:'./module-manage.component.html',
    providers: [AppManageService,CommonService],
})
export class ModulesManageComponent implements OnInit{
    public moduleManageForm: FormGroup;
    public model: ModuleManageModel = new ModuleManageModel();
    public isLoading:boolean = false;//按钮加载效果
    public appId: string;   //应用id
    public isEdit:boolean = false; //用于判断保存按钮是否置灰
    public selectedNode:TreeNode; //选中节点
    public treeNodes:Array<any> = []; //模块管理菜单树数据
    @ViewChild(NzTreeComponent) tree: NzTreeComponent;//抓取整个菜单树
    options = {       //节点选中项
        actionMapping: {
            mouse: {
                click: (tree, node, $event) => { //选中节点
                    // that.tree.treeModel.update();
                    // TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
                    TREE_ACTIONS.SELECT(tree, node, $event);
                    if(node){//有节点数据
                        this.selectedNode = node;
                        this.model = newClone(node.data.data);
                        // this.log.debug('节点数据：：：',this.selectedNode.data,'表单model::::',this.model);
                        if(node.data.parentName){ //有父级
                            this.model.pTitle = node.data.parentName;
                        }
                    }
                    this.isEdit = false;//选中节点后需要点击上方的几个操作按钮，才能进行编辑保存，否则保存按钮置灰
                }
            }
        },
    };
    constructor(public helper: HelperService,
                public i18n: I18NService,
                protected modalService: NzModalService,
                public menuService: MenuService,
                public router: Router,
                protected appManageService: AppManageService,
                protected fb: FormBuilder,
                public msg: NzMessageService,
                public subject: NzModalSubject,
                public objectExtend: ObjectExtend,
                public log:NzLocaleService,
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params = menu['params'];
        this.appId = params['appId'];
        this.loadModuleTree();

        this.moduleManageForm = this.fb.group({
            id:[this.model.id],//编号,编辑时必传
            parent:[this.model.parent],//父级
            pTitle:[this.model.pTitle],//父模块名称
            name:[this.model.name, [Validators.required]],//模块名称
            ordered:[this.model.ordered, [Validators.required, this.numberValidator]],//模块排序
            iconClass:[this.model.iconClass],//模块图标样式类
            module:[this.model.module],//请求地址
            roles:[this.model.roles],//角色
            appCode:[this.model.appCode],//模块源码
            isShow:[this.model.isShow],//是否激活
            isSysMenu:[this.model.isSysMenu],//是否为系统菜单
        });
    }

    //初始化模块管理信息（菜单树）
    public loadModuleTree(){
        this.appManageService.loadModuleTree({appId:this.appId}).subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.treeNodes = res[CommonEnum.SERVER_DATA_KEY];
            }
        });
    }

    /**
     * 添加父节点
     */
    onAddParentNode(evt: any){
        if(!this.objectExtend.isEmpty(this.selectedNode)){
            TREE_ACTIONS.DESELECT(this.tree.treeModel, this.selectedNode, evt);
        }
        this.moduleManageForm.reset({
            parent:0,
            pTitle:{value:'',disabled:true}
        });
        this.isEdit = true;
        this.selectedNode = null;//只要点击了父节点，要清除之前选中的节点
    }

    /**
     * 添加子节点
     */
    onAddChildNode(){
        if(this.objectExtend.isEmpty(this.selectedNode)){
            this.msg.warning(this.i18n.fanyi('AppManage.moduleManagePage.tips.addChildTip'));
            return false;
        }
        let _data = this.selectedNode.data.data;
        // this.log.debug('添加子节点：：：',this.selectedNode.data.data,_data.id,_data.name);

        this.moduleManageForm.reset({
            parent:_data.id,
            pTitle:{value:_data.name,disabled:true}
        });
        // this.log.debug('添加子节点的model::',this.model);
        this.isEdit = true;
    }

    /**
     * 编辑节点
     */
    onEditNode(){
        // this.log.debug('看一下编辑节点时this.selectedNode::::',this.selectedNode);
        if(this.objectExtend.isEmpty(this.selectedNode)){
            this.msg.warning(this.i18n.fanyi('AppManage.moduleManagePage.tips.editNodeTip'));
        }
        this.isEdit = true;
        return false;
    }

    /**
     * 删除节点
     */
    onDelNode(){
        // this.log.debug('看一下删除节点时this.selectedNode::::',this.selectedNode);
        if(this.objectExtend.isEmpty(this.selectedNode)){
            this.msg.warning(this.i18n.fanyi('AppManage.moduleManagePage.tips.deleteNodeTip'));
            return false;
        }
        let that = this;
        that.modalService.confirm({
            title  : that.i18n.fanyi('default.hint.hintInfo'),
            content: that.i18n.fanyi('AppManage.moduleManagePage.tips.deleteTip', that.selectedNode.data.data['name']),
            maskClosable:false,// 点击蒙层不允许关闭;
            onOk() {
                that.appManageService.delModuleTree({id:that.selectedNode.data.data['id']}).subscribe((res) => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        that.msg.success(that.i18n.fanyi('default.hint.delSuccess'));
                        that.loadModuleTree();//刷新
                        that.moduleManageForm.reset();//重置
                        that.selectedNode = null; //要把之前的选中项清空
                    }else {
                        that.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            },
            onCancel() {
            }
        });
        return false;
    }

    /**
     * 保存
     */
    onSave(){
        this.isLoading = true;
        this.model.appId = this.appId;
        this.model.ordered = Number(this.model.ordered);
        this.model.isShow  = this.boolToNumber(this.model.isShow);
        this.model.isSysMenu = this.boolToNumber(this.model.isSysMenu);
        //根据是否有id判断是新增还是编辑
        let saveSubscribe = this.model.id ? this.appManageService.updateModuleTree(this.model) : this.appManageService.addModuleTree(this.model);
        saveSubscribe.subscribe(res => {
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.loadModuleTree();//刷新
                this.moduleManageForm.reset();//重置
                this.selectedNode = null; //要把之前的选中项清空
                this.subject.destroy('onOk');
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.moduleManageForm.controls[name];
    }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){ //有值
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true};
            }
        }
    }

    /**
     *布尔值转数字
     */
    boolToNumber(val:any){
        return val == true ? 1 : 0;
    }
}
