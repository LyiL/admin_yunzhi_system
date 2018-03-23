import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 微信开发者平台数据源
 * Created by lyl on 2018/3/2
 */
@Injectable()
export class WxDevPlatformService {
    constructor(private http:HttpService){
    }

    /**
     * 微信开发者平台列表查询地址
     * private Integer id  ;//编号
     private String organNo ;//机构编号
     private String name;//公众账号名称
     */
    public static WX_DEV_PLATFORM_LIST_URL = '/wechatthdplat/pagingquery';

    /**
     * 受理机构查询地址
     */
    public static ORGNO_URL = '/paymentBankOrgan/page';

    /**
     * 新增或编辑
     * Integer id  ;//编号               编辑时必填
     String organNo ;//机构编号              *
     String organName ;//机构名称                *
     String name;//公众账号名称                *
     Integer type;//公众号类型(0:订阅号, 1:历史老账号升级的订阅好, 2:服务号)               *
     String token;//标识                       *
     String appid;//公众号第三方平台APPID    *
     String appsecret;//应用秘钥             *
     String host;//主服务域名             *
     String aesKey;//签名秘钥                *
     String  authHost;  授权域              *
     String remark;//备注
     */
    savePlatformData(params:any):Observable<any>{
        return this.http.post('/wechatthdplat/save',params);
    }

    /**
     * 查看详情
     * Integer id  ;//主键 *
     */
    loadDetail(params:any):Observable<any>{
        return this.http.post('/wechatthdplat/findbyid',params);
    }

}
