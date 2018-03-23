import {BaseForm} from "./base.form";
export class LoginForm extends BaseForm{
  public userName:string;//用户名
  public userPwd:string;//用户密码
  public captcha:string;//验证码
  public remember:boolean; //记住密码
  public appId:string;//应用ID
}
