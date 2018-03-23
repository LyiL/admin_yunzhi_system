import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';

import {AcceptingInstitutionListDbService} from '../../../common/services/request/center-manage/accepting-institution.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {HelperService} from '../../../common/services/helper.service';
import {syncMchModel} from '../../../common/model/center-manage/syns-mch.model';
import {acceptInsAddModel} from '../../../common/model/center-manage/accept-ins-add.model';
import {CommonEnum} from '../../../common/enum/common.enum';
import {SearchWindowConfig} from '@delon/abc';
/**
 * create by hsz 2018-3-1
 * 同步商户配置弹窗
 */
@Component({
    selector:'sync-mch-win',
    templateUrl:'./sync-mch-win.component.html',
    providers:[AcceptingInstitutionListDbService]
})
export class syncMchWinComponent implements OnInit{
    public model: acceptInsAddModel = new acceptInsAddModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading
    public orgNo:any; // 接收父级传的orgNo
    public orgId:any; //接收父级传的orgId
    public aliPayName:any; //接收支付宝配置支付中心名称
    public qqPayName:any; //接收QQ配置支付中心名称
    public wxPayName:any; //接收微信配置支付中心名称


    /**
     * 结算方
     */
    public billType:Array<any> = [];
    /**
     * qq支付中心控件配置
     */
    public qqCenterIdTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title'),
        url: AcceptingInstitutionListDbService.PAYCENTER_LIST_URL,
        isAjax: true,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [
            {
                field: 'name',
                label: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title')
            }],
        tableColumns: [{
            title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.name'),
            index: 'name'
        }]
    };
    /**
     * 支付宝支付中心控件配置
     */
    public aliCenterIdTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title'),
        url: AcceptingInstitutionListDbService.PAYCENTER_LIST_URL,
        isAjax: true,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [
            {
                field: 'name',
                label: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title')
            }],
        tableColumns: [{
            title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.name'),
            index: 'name'
        }]
    };
    /**
     * 微信支付中心控件配置
     */
    public wxCenterIdTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title'),
        url: AcceptingInstitutionListDbService.PAYCENTER_LIST_URL,
        isAjax: true,
        params:{},
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [
            {
                field: 'name',
                label: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.title')
            }],
        tableColumns: [{
            title: this.i18n.fanyi('CenterManger.syncMch.payInfoCfg.name'),
            index: 'name'
        }]
    };

    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,public modal: NzModalSubject,
                public AccInsDb:AcceptingInstitutionListDbService){

    }
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'alipayMchSync': new FormControl(this.model.alipayMchSync, ),
            'qqMchSync': new FormControl(this.model.qqMchSync, ),
            'wechatMchSync': new FormControl(this.model.wechatMchSync,),
        });
        this.qqCenterIdTableCfg.params ={bankNo:this.orgNo,searchType:3};
        this.wxCenterIdTableCfg.params ={bankNo:this.orgNo,searchType:2};
        this.aliCenterIdTableCfg.params ={bankNo:this.orgNo,searchType:1};
        this.AccInsDb.acceptInsById({orgId:this.orgId}).subscribe(res =>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.model = res[CommonEnum.SERVER_DATA_KEY];
                this.aliPayName = res[CommonEnum.SERVER_DATA_KEY]["alipayMchSyncName"];
                this.qqPayName = res[CommonEnum.SERVER_DATA_KEY]["qqMchSyncName"];
                this.wxPayName = res[CommonEnum.SERVER_DATA_KEY]["wechatMchSyncName"];
            }
        })
    }

    _submitForm(){
        this.isLoadingOne = true;
            this.AccInsDb.acceptInsUpdate(this.model).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.modal.destroy('onOk');
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            })
    }

    /**
     * 支付宝选中事件
     * @param value
     */
    onAliSelected(value){
        this.model.alipayMchSync = value.id;
    }
    /**
     * QQ选中事件
     * @param value
     */
    onQQSelected(value){
        this.model.qqMchSync = value.id;
    }
    /**
     * 微信选中事件
     * @param value
     */
    onWxSelected(value){
        this.model.wechatMchSync = value.id;
    }

    getFormControl(name) {
        return this.modelGroup.controls[ name ];
    }
    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        var req = /^[0-9]*$/;//整数
        // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
        let valid = req.test(control.value);
        if(!valid){
            return {numberError:true,error:true};
        }
    }
}
