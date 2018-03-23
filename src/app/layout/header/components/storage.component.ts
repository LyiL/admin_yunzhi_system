import { Component, HostListener } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import {SettingsService} from "@delon/theme";
import {AuthService} from "../../../common/services/auth/auth.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../common/enum/common.enum";

@Component({
    selector: 'header-storage',
    template: `
    <i class="anticon anticon-tool"></i>
    {{ 'clear-local-storage' | translate}}`
})
export class HeaderStorageComponent {

    constructor(
        private confirmServ: NzModalService,
        private messageServ: NzMessageService,
        private settingService:SettingsService,
        private autoService:AuthService,
        private i18n:I18NService
    ) {
    }

    @HostListener('click')
    _click() {
        this.confirmServ.confirm({
            title: this.i18n.fanyi('clearLocalStorage'),
            onOk: () => {
                this.autoService.quit().subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == res[CommonEnum.SERVER_STATUS_DATE_KEY]){
                        this.settingService.setUser(null);
                    }
                });
                localStorage.clear();
                this.messageServ.success(this.i18n.fanyi('clearLocalStorage'));
            }
        });
    }
}
