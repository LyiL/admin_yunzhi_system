import {Component, Inject, OnInit, Renderer2, ViewChild, ViewContainerRef} from "@angular/core";
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Title,ɵgetDOM as getDOM} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {NzMessageService, NzLocaleService, ObjectExtend} from "ng-zorro-antd";
import {CommonEnum} from "../common/enum/common.enum";
import {LoginForm} from "../common/form/login.form";
import {SettingsService, MenuService} from "@delon/theme";
import {CommonService} from "../common/services/request/common.service";
import {AuthService} from "../common/services/auth/auth.service";
import {ReuseTabService} from "@delon/abc";

@Component({
  selector:'login',
  templateUrl:'./login.component.html',
  styleUrls:['login.less']
})
export class LoginComponent implements OnInit{
  public validateForm: FormGroup;
  public form:LoginForm = new LoginForm();
  public title:string = "管理平台";
  public isLoading:boolean = false;
  @ViewChild('yzm',{ read: ViewContainerRef }) yzm:ViewContainerRef;

  constructor(private fb: FormBuilder,private router:Router,private render2:Renderer2,
              @Inject(DOCUMENT) public _doc: any,
              private settingService:SettingsService,
              private menuService:MenuService,
              private commonService:CommonService,
              private authService:AuthService,
              private objectExtedn:ObjectExtend,
              private reuseTabService:ReuseTabService,
              private _message: NzMessageService,private _title:Title) {
  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      userName: new FormControl(this.form.userName, [ Validators.required, Validators.minLength(5)]),
      userPwd: new FormControl(this.form.userPwd, [ Validators.required, Validators.minLength(6)]),
      captcha: new FormControl(this.form.captcha,[ Validators.required,Validators.maxLength(4),Validators.minLength(4) ]),
      remember:new FormControl(this.form.remember)
    });
    this.initYzm();

    let appData = this.settingService.app;
    this._title.setTitle(appData['TITLE']);
    this.setIconLink(appData['ICON']);
    this.title = appData['TITLE'];
    //判断是否记住登录用户信息
    const remember = localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_REMEMBER];
    if(remember && remember === 'true'){
      this.form.remember = true;
    }else{
      this.form.remember = false;
    }
    this.form.userName = localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_USERNAME];
    this.form.userPwd = localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_USERPWD];
    if(this.objectExtedn.size(this.settingService.user) > 0){
        if(this.settingService.user['lock']){
            this.router.navigate(['/lock']);
        }else{
            this.router.navigate([this.toOnePath()]);
        }
      return;
    }
  }

  /**
   * 登录方法
   */
  public onLoginHeadler(){

    if(this.validateForm.valid){
        this.isLoading = true;
        this.form.appId = this.settingService.app['APPID'];
        this.authService.login(this.form,(()=>{
            this.reuseTabService.clear();
            this.router.navigate([this.toOnePath()]);
            this.isLoading = false;
        }).bind(this)).subscribe(res=>{
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_REMEMBER] = this.form.remember;
                if(this.form.remember){
                    localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_USERNAME] = this.form.userName;
                    localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_USERPWD] = this.form.userPwd;
                }else{
                    localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_USERNAME] = '';
                    localStorage[CommonEnum.AUTH_SESSION_STORAGE_KEY.LOGIN_USERPWD] = '';
                }
            }else{
                this._message.info(res[CommonEnum.SERVER_MES_KEY]);
            }
        });

    }
  }

  /**
   * 获取验证码
   */
  public initYzm(){
    let DOMURL = window.URL || window['webkitURL'] || window;
    this.commonService.loadAuthCode().subscribe(res=>{
      let img = this.render2.createElement('img');
      img.src = DOMURL.createObjectURL(res.blob);
      this.render2.addClass(img,'captchaImg');
      this.render2.listen(img,'click',this.onCaptchaHandler.bind(this));
      this.render2.appendChild(this.yzm.element.nativeElement,img);
    });
  }

  /**
   * 验证点击事件
   * @param event
   */
  public onCaptchaHandler(event:any){
    let target = event.target;
    let DOMURL = window.URL || window['webkitURL'] || window;
    this.commonService.loadAuthCode().subscribe(res=>{
      target.src = DOMURL.createObjectURL(res.blob);
    });
  }

  /**
   * 获取平台的第一个子菜单信息
   * @returns {string}
   */
  public toOnePath():string{
    let menu = this.menuService.menus;
    let url = '';
        menu = menu && menu.length > 0 && menu[0]['children'];
        if(!menu){
            return url;
        }
        menu.forEach((item,index)=>{
            if(index != 0){return;}
            if(item && item['children'] && item['children'].length > 0){
               url = item['children'][0]['link'];
            }else if(item && item['link']){
               url = item['link'];
            }
        });
    return url;
  }

  /**
   * 设置icon图标
   * @param href
   */
  public setIconLink(href:string){
    let link = getDOM().querySelector(this._doc,'link');
    if(getDOM().getAttribute(link,'type') == 'image/x-icon'){
      getDOM().setAttribute(link,'href',href);
    }
  }
}
