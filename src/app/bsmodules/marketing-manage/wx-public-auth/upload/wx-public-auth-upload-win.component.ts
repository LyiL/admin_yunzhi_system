import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { WxPublicAuthUploadModel } from '../../../../common/model/marketing-manage/wx-public-auth-upload.model';
import {HelperService} from '../../../../common/services/helper.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {WxPublicAuthService} from '../../../../common/services/request/marketing-manage/wx-public-auth.service';
import {FileUploadComponent} from '@delon/abc/file-upload/file-upload.component';

/**
 * 公众号授权二维码图片上传弹窗
 * Created by hux on 2018/3/2
 */
@Component({
    selector:'wx-public-auth-upload-win',
    templateUrl:'./wx-public-auth-upload-win.component.html',
    styles:[`
        .visible-hide{visibility: hidden;}
        .upload-row{margin-bottom: 0;margin-top:-50px}
    `],
    providers:[WxPublicAuthService]
})
export class WxPublicAuthUploadWinComponent implements OnInit{

    public model:WxPublicAuthUploadModel = new WxPublicAuthUploadModel();
    public id:number; // 列表页传递过来主键id
    public uploadResult:string; // 文件上传显示信息
    public onUpload:EventEmitter<any> = new EventEmitter(); // 文件上传事件
    @ViewChild('followCodeUpload') followCodeUpload:FileUploadComponent; // 文件上传控件

    // 文件上传控件配置
    public defFieldUploadSetting: any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.png;',
        autoUpload:false
    };

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg: NzMessageService,
        public wxPublicAuthDB:WxPublicAuthService,
        public _modal:NzModalSubject
    ) {
        // 默认显示文件未上传
        this.uploadResult = this.i18n.fanyi('WxPublicAuth.win.fileEmptyTip');
    }

    ngOnInit(){
        if(!this.helper.isEmpty(this.id)){
            this.model['id'] = this.id;
        }

        // 如果有二维码图片，则显示文件已上传
        if(this.model.followCode){
            this.uploadResult = this.i18n.fanyi('WxPublicAuth.win.fileHasTip');
        }
    }

    /**
     * 文件上传错误信息
     * @param data
     */
    public onFileUploadError(data){
        if(data && data[CommonEnum.SERVER_MES_KEY]){
            this._msg.warning(data[CommonEnum.SERVER_MES_KEY]);
        }else if(data[CommonEnum.SERVER_ERROR_KEY] == true){
            this._msg.warning(this.i18n.fanyi('WxPublicAuth.win.uploadErrMsg'));
        }
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.onUpload.emit('startUpload'); //异步上传
    }

    /**
     * 图片上传事件
     * @param data
     */
    onUploadFile(data){
        let _res = JSON.parse(data.response);
        if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            this.uploadResult = this.i18n.fanyi('WxPublicAuth.win.uploadSucMsg');
            let _data = _res['data'];
            this.model['followCode'] = _data['key'];
            this.wxPublicAuthDB.uploadFile(this.model).subscribe(result => {
                    if(result && result[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                        this._modal.destroy('onOk');
                    }else{
                        this._msg.error(result[CommonEnum.SERVER_MES_KEY]);
                    }
                });
        }else{
            this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
        }
    }

    /**
     * 图片上传按钮点击事件
     */
    onSelectFile(){
        this.followCodeUpload.uploader.clearQueue(); // 清除上传文件队列
        this.followCodeUpload._onClick(); // 打开选择文件弹窗
    }
}

