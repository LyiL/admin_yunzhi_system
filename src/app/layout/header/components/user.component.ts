import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {AuthService} from "../../../common/services/auth/auth.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {ReuseTabService} from "@delon/abc";
import {ModifyLoginPswWinComponent} from "./modifyLoginPsw/modify-login-psw-win.component";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <!--<nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>-->
            {{settings.user['userName']}}
        </div>
        <div nz-menu class="width-sm">
            <!--<div nz-menu-item [nzDisable]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>-->
            <!--<div nz-menu-item [nzDisable]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>-->
            <div nz-menu-item (click)="modifyPsw()"><i class="anticon anticon-setting mr-sm"></i>修改密码</div>
            <li nz-menu-divider></li>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent  {
    constructor(
        public settings: SettingsService,
        private router: Router,
        private authService:AuthService,
        private reuseTabService:ReuseTabService,
        public helper:HelperService,
        public i18n:I18NService,
        public modalService:NzModalService,
        public _msg: NzMessageService,
    ) {}


    logout() {
        this.authService.quit().subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == 200){
                this.reuseTabService.clear();
                this.router.navigate(['/login']);
            }
        });
    }

    /**
     * 修改密码弹框
     */
    modifyPsw(){
        const pswWin = this.modalService.open({
            title:this.i18n.fanyi('ModifyLoginPswWin.title'),
            content:ModifyLoginPswWinComponent,
            footer:false,
            maskClosable:false,
        });
        pswWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('default.hint.modifySuccess'));
            }
        })
    }
}
