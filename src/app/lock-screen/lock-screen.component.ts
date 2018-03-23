import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {SettingsService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../common/enum/common.enum";
import {Md5} from "ts-md5/dist/md5";
import {I18NService} from "../common/i18n/i18n.service";
import {NzMessageService} from "ng-zorro-antd";
@Component({
    selector:'lock-screen',
    templateUrl:'./lock-screen.component.html'
})
export class LockScreenComponent implements OnInit{
    /**
     * 表单对象
     */
    public lockScreenForm:FormGroup;
    public pass:string;

    constructor(private setting:SettingsService,private fb:FormBuilder,private router:Router,private i18n:I18NService,private msg:NzMessageService){
        this.setLock();
    }

    ngOnInit(){
        this.lockScreenForm = this.fb.group({
           password:[this.pass,Validators.required]
        });
    }

    submit(){
        if(this.setting.user['userPwd'] == Md5.hashStr(this.pass)){
            this.setLock(false);
            this.router.navigate([sessionStorage.getItem(CommonEnum.LOCK_URL)]);
        }else{
            this.msg.info(this.i18n.fanyi("lockScreen.passErrorHint"));
        }
    }

    private setLock(flag:boolean = true){
        this.setting.setUser(Object['assign'](this.setting.user,{lock:flag}));
        let userData = sessionStorage.getItem(CommonEnum.AUTH_SESSION_STORAGE_KEY.USER_INFO);
        if(userData){
            userData = JSON.parse(userData || 'null') || null;
            if(userData != null){
                userData['lock'] = flag;
                sessionStorage.setItem(CommonEnum.AUTH_SESSION_STORAGE_KEY.USER_INFO,JSON.stringify(userData));
            }
        }
    }
}
