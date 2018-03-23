import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../net/http.service";
import {CommonEnum} from "../../enum/common.enum";

@Injectable()
export class CommonService{
    constructor(private http:HttpService){}

    /**
     * 受理机构查询地址
     * String  orgNo  机构编号
     String  name  机构名称
     String  preEnName  私有云前缀
     int  status  状态:待审核、正常、冻结
     String  notOrgNo  不显示的机构编号
     */
    public static ORGNO_URL = '/paymentBankOrgan/page';

    /**
     *所属上级（服务商、代理商）
     *String  name：上级名称
     *String  chanCode：上级编号
     * Integer  examState：审核状态，默认已审核
     * Integer  activeState：激活状态，默认已激活
     * String  bankCode：所属受理机构编号
     * String  chanType：类型(0:代理商 1:服务商)
     */
    public static PARENTCHAN_INFO_URL = '/query/chanInfo';
    /**
     *商户/门店
     * String merchantNo 商户/门店编号
     * String name 商户/门店名称
     * String  chanNo：所属代理商编号
     * Integer  examState：审核状态
     * Integer  activeState：激活状态
     * String  bankNo：所属受理机构编号
     * Integer mchRole:商户类型(0:线上商户 1：线下商户 2：门店)
     * Integer isStore:是否门店(0：查询线上、线下商户 1：查询门店)
     * String appCode：代理商类型(bank_cloud:分支机构  pay_chan:代理商)
     */
    public static MCH_INFO_URL = '/query/dealerInfo';

    /**
     *联行号
     * String  subBankName：支行名称
     * String linkNo:支行编号
     */
    public static BANKLINKNO_INFO_URL = '/query/searchBankLinkno';

    /**
     * 登录请求方法
     * @param params 登录参数
     * @returns {Observable<any>}
     */
    public login(params:any):any{
        return this.http.post('/loginAuth/login',params);
    }

    /**
     * 退出请求方法
     * @returns {Observable<any>}
     */
    public quit():any{
        return this.http.post('/loginAuth/loginOut');
    }
    /**
     * 修改密码弹框
     * @param params 登录参数
     * String userPwd:旧密码  *
     * String newPassword: 新密码 *
     * String newpwd2: 确认新密码 *
     * @returns {Observable<any>}
     */
    public modifyPsw(params){
        return this.http.post('/loginAuth/changePwd',params);
    }

    /**
     * 加载菜单数据
     * @returns {Observable<any>}
     */
    public loadMenuData():any{
        return this.http.post('/loginAuth/getTree');
    }

    /**
     * 加载系统配置项
     * @returns {Observable<any>}
     */
    public loadSysCfg():any{
        return this.http.post('/sysConfig/finds');
    }

    /**
     * 加载领域信息
     * @param host 域名host
     * @returns {Observable<any>}
     */
    public loadDomainCfg(host:string){
        return this.http.post('/platDomainCfg/getContentByHost',{hosts:host});
    }

    public loadAuthCode(){
        let random = String(Math.random()).substring(2);
        return this.http.download('/captcha/getKaptchaImage'+'?'+random);
    }
}
