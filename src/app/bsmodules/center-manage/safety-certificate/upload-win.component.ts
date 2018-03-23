import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {I18NService} from '../../../common/i18n/i18n.service';
import {HelperService} from '../../../common/services/helper.service';
import {safetyCertificateDbService} from '../../../common/services/request/center-manage/safety-certificate.service';
import {CommonEnum} from '../../../common/enum/common.enum';
import {FileUploadComponent, SearchWindowConfig} from '@delon/abc';


/**
 * create by hsz 2018-3-2
 * 上传证书弹窗
 */
@Component({
    selector:'upload-win',
    templateUrl:'./upload-win.component.html',
    providers:[CommonEnum,safetyCertificateDbService]
})
export class uploadWinComponent implements OnInit{
    public modelGroup: FormGroup;
    @ViewChild('fileUpload') fileUpload:FileUploadComponent;
    public isLoadingOne = false; // loading
    public id:any; // 接收上级传递的id
    public certSet:any;//接收上级传递的certSet
    public certStatus:any;//接收证书上传状态
    public onUpload:EventEmitter<any> = new EventEmitter();

    constructor(public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,public modal: NzModalSubject,
                public SCDb:safetyCertificateDbService,){}
    ngOnInit(){

            this.certStatus = this.certSet;
        this.defFieldUploadSetting['url'] = '/paymentgatewaycert/upload/'+ this.id;
    }
    _submitForm(){
        this.onUpload.emit('startUpload'); //异步上传

    }

    /**
     * 立即上传事件
     * @param data
     */
    public handleUpload(data){
        if(data[CommonEnum.SERVER_STATUS_KEY] != CommonEnum.SERVER_STATUS_DATE_KEY){
            return;
        }
        let res = JSON.parse(data.response);
        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            this.msg.success(this.i18n.fanyi('CenterManger.tips.uploadSuccess'));
            this.modal.destroy('onOk');
        }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }

    }
    //文件上传控件配置
    public defFieldUploadSetting:any = {
        url:'',
        autoUpload:false
    };

    /**
     * 打开Windows多次上传
     *
     */
    fileUploads(){
        this.fileUpload.uploader.clearQueue(); //先清空上传队列
        this.fileUpload._onClick(); // 再次上传以保证每次上传一次请求，一个文件
    }
}
