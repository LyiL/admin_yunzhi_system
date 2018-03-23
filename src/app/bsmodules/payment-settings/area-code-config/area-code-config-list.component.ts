import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {AreaCodeConfigForm} from '../../../common/form/payment-settings/area-code-config.form';
import {AreaCodeConfigService} from '../../../common/services/request/payment-settings/area-code-config.service';
import {AreaCodeConfigWinComponent} from './area-code-config-win.component';
import {ModalHelper} from '@delon/theme';
import {newClone} from '@delon/abc/utils/utils';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

/**
 * 地区码配置列表页
 * Created by hux on 2018/3/1
 */
@Component({
    selector: 'area-code-config-list',
    templateUrl: './area-code-config-list.component.html',
    providers:[AreaCodeConfigService]
})
export class AreaCodeConfigListComponent{
    public areaCodeConfigListForm: AreaCodeConfigForm = new AreaCodeConfigForm();

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public modalHelper:ModalHelper,
        public modalService:NzModalService,
        public areaCodeConfigService:AreaCodeConfigService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('areaCodeConfigListTable') public areaCodeConfigListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:AreaCodeConfigService.AREA_CODE_CONFIG_LIST_URL,
        params:this.areaCodeConfigListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 地区码
                title:this.i18n.fanyi('AreaCodeConfig.listPage.search.areaCode'),
                index:'areaCode'
            },
            {
                // 地区名称
                title:this.i18n.fanyi('AreaCodeConfig.listPage.search.name'),
                index:'name'
            },
            {
                // 国际编码
                title:this.i18n.fanyi('AreaCodeConfig.listPage.search.adCode'),
                render:'adCodeRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 编辑
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AREAEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEditAreaCodeConfig.bind(this)
                    },
                    {
                        // 删除
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('AREADELETE')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onDeleteAreaCodeConfig.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.areaCodeConfigListTable.doSearch();
    }

    /**
     * 新增地区码配置
     */
    public onNewAreaCodeConfig(){
        let subscription = this.modalHelper.static(AreaCodeConfigWinComponent,{},600,{title: this.i18n.fanyi('AreaCodeConfig.win.newTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.areaCodeConfigListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 编辑地区码配置
     */
    public onEditAreaCodeConfig(row:any){
        let subscription = this.modalHelper.static(AreaCodeConfigWinComponent,{
            model:newClone(row)
        },600,{title: this.i18n.fanyi('AreaCodeConfig.win.editTitle')});
        subscription.subscribe(res => {
            if(res && res == 'onOk'){
                this.areaCodeConfigListTable.doSearch(false); //刷新表格
            }
        })
    }

    /**
     * 删除地区码配置
     */
    public onDeleteAreaCodeConfig(row:any){
        let subscription = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('AreaCodeConfig.win.delConfirm',row['name']),
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.areaCodeConfigService.delete({id: row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.areaCodeConfigListTable.doSearch(false);
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }
}
