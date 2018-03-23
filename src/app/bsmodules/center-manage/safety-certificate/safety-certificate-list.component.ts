import {Component, OnInit, ViewChild} from '@angular/core';

import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MenuService, ModalHelper} from '@delon/theme';

import {SimpleTableComponent} from '@delon/abc';
import {Router} from '@angular/router';
import {CommonEnum} from '../../../common/enum/common.enum';
import {safetyCertificateForm} from '../../../common/form/center-manage/safety-certificate.form';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {safetyCertificateDbService} from '../../../common/services/request/center-manage/safety-certificate.service';
import {safetyCertificateAddWinComponent} from './safety-certificate-add-win.component';
import {uploadWinComponent} from './upload-win.component';
/**
 * create by hsz 2018-3-2
 * 安全证书列表页面
 */
@Component({
    selector: 'safety-certificate',
    templateUrl: './safety-certificate-list.component.html',
    providers: [CommonEnum,safetyCertificateDbService]
})
export class safetyCertificateListComponent implements OnInit {
    public form: safetyCertificateForm = new safetyCertificateForm();
    /**
     * 证书类型
     */
    public certTypes:Array<any> = [];
    /**
     * 安全证书列表控件配置
     */
    @ViewChild('safCertListTable') public safCertListTable: SimpleTableComponent;
    public tableCfg: any = {
        url: safetyCertificateDbService.SAFETY_CERT_LIST_URL,
        params: this.form,
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title: this.i18n.fanyi('CenterManger.SCManage.listPage.certType'),
                // index: 'certType',
                render: "certTypeRender",

            }, {
                title: this.i18n.fanyi('CenterManger.SCManage.listPage.certName'),
                render: 'certNameRender',

            }, {
                title: this.i18n.fanyi('CenterManger.SCManage.listPage.thridMerchantNo'),
                // index:'payAccountName',
                render: "thridMerchantNoRender",

            }, {
                title: this.i18n.fanyi('CenterManger.SCManage.listPage.certSet'),
                // index:'payAccountCardno',
                render: "certSetRender",
            },
            {
                title: this.i18n.fanyi('default.tableCol.action'),
                buttons: [{
                    text: this.i18n.fanyi('CenterManger.btn.upload'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('ASCUPLOAD')){
                            return true;
                        }
                    }),
                    click: this.upload.bind(this),
                }, {
                    text: this.i18n.fanyi('CenterManger.btn.download'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('ASCDOWNLOAD')){
                            return true;
                        }
                    }),
                    click: this.download.bind(this),
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('ASCDEL')){
                            return true;
                        }
                    }),
                    click: this.onDel.bind(this),
                }
                ]
            }
        ]
    };


    constructor(public helper: HelperService, public i18n: I18NService, public msg: NzMessageService,public modalService: NzModalService,
                public SCDb:safetyCertificateDbService,
                public modal: ModalHelper, public menuService: MenuService, public router: Router,) {
    }

    ngOnInit() {
        this.certTypes = this.helper.getDictByKey('GW_CERT_TYPE');

    }
        /**
         * 查询
         */
        onSearch()
        {
            this.safCertListTable.doSearch();
        }
        /**
         * 添加安全证书
         */
        onAdd()
        {
            let win = this.modal.static(safetyCertificateAddWinComponent,{
            },580,{title: this.i18n.fanyi('CenterManger.syncMch.title')});
            win.subscribe(res => {
                if(res && res == 'onOk'){
                    this.safCertListTable.doSearch(false); //刷新表格
                }
            })
        }

        /**
         * 删除
         */
        onDel(row:any){
            this.modalService.confirm({
                title: this.i18n.fanyi('default.hint.hintInfo'),
                content: this.i18n.fanyi('CenterManger.tips.SCDel1'),
                okText: this.i18n.fanyi('Modal.okText'),
                maskClosable:false,
                width:"500px",
                onOk: () => {
                    this.SCDb.Del(
                        {id:row["id"]}
                    ).subscribe(res => {
                        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                            this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        } else {
                            this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                        }
                        this.safCertListTable.doSearch(false);
                    })
                }
            });
        }
    /**
     * 证书上传
     */
    upload(row:any){
        let win = this.modal.static(uploadWinComponent,
            {id:row["id"],certSet:row['certSet']}
        ,580,{title: this.i18n.fanyi('CenterManger.SCManage.uploadC')});
        win.subscribe(res => {
            if(res && res == 'onOk'){
                this.safCertListTable.doSearch(false); //刷新表格
            }
        })
    }
    /**
     * 下载
     */
    download(row:any){
        this.SCDb.download({id:row['id']}).subscribe(res => {
            // this.downloadFile(res.fileName, res.blob);
            if (res instanceof FileReader) {
                res.onloadend = (function () {
                    let _res = JSON.parse(res.result);
                    this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                }).bind(this);
            } else {
                this.msg.success(this.i18n.fanyi('CenterManger.tips.download'));
                this.downloadFile(res.fileName, res.blob); //导出报表
            }
        });
    }
    downloadFile(fileName, content) {
        var aLink = document.createElement('a');
        var blob = content;
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    }
}
