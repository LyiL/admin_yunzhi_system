import {Component, OnInit} from '@angular/core';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {NzMessageService} from 'ng-zorro-antd';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {mchNoCfgAddModel} from '../../../../common/model/center-manage/mchnocfg-add.model';
import {AcceptingInstitutionListDbService} from '../../../../common/services/request/center-manage/accepting-institution.service';
import {Router} from '@angular/router';
import {MenuService} from '@delon/theme';
/**
 * create by hsz 2018-2-28
 * 新增或编辑商户号页面
 */
@Component({
    selector:'mchNo-cfg-add',
    templateUrl:'./mchNo-cfg-add.component.html',
    providers:[CommonEnum,AcceptingInstitutionListDbService]
})
export class mchNocfgAddComponent implements OnInit {
    public model:mchNoCfgAddModel = new mchNoCfgAddModel();
    public modelGroup: FormGroup;
    public isLoadingOne = false; // loading

    constructor(public i18n:I18NService,public helper:HelperService, public menuService: MenuService, public router: Router,
                public msg: NzMessageService,public AccInsDb:AcceptingInstitutionListDbService){

    }
    ngOnInit(){
        this.modelGroup = new FormGroup({
            'companion': new FormControl(this.model.companion,[Validators.required]),
            'companionName': new FormControl(this.model.companionName, [Validators.required]),
            'exportClass': new FormControl(this.model.exportClass),
            'payAccountCardno': new FormControl(this.model.payAccountCardno),
            'payAccountName': new FormControl(this.model.payAccountName),
        });
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if (menu && menu['params']) { // 判断路由是否有传参
            let params = menu['params'];
            this.model['bankNo'] = params['bankNo'];
            if(params['id']){ //编辑进来查询单条数据赋值给model
                this.AccInsDb.mchById({id:params['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                    }
                })
            }
        }
    }
    _submitForm() {
        this.isLoadingOne = true;
        if(this.modelGroup.valid){
            let _id = this.model.id ? this.AccInsDb.mchUpdate(this.model) : this.AccInsDb.mchSave(this.model);
            // this.AccInsDb.mchSave(this.model)
            _id.subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.helper.navigate('/admin/center/mchNoCfg', this.i18n.fanyi('CenterManger.mchCfg.title'),{bankNo:this.model['bankNo']});
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            })
        }
    }

    /**
     * 取消
     */
    onGoBack(){
        this.helper.navigate('/admin/center/mchNoCfg', this.i18n.fanyi('CenterManger.mchCfg.title'), {bankNo:this.model['bankNo']});
    }


    getFormControl(name) {
        return this.modelGroup.controls[ name ];
    }
}
