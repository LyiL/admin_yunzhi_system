import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * Created by cty on 2018/3/1.
 * 领域管理接口
 */

@Injectable()
export class FieldService {
    constructor(public http: HttpService) {}

    /**
     * 领域列表接口
     * Integer domainId; //领域ID
     String confName; //领域配置名称
     String confCode; //领域配置编码
     String confType; //领域配置类型
     * @type {string}
     */
    public static FIELD_LIST_URL = '/platdomain/pagingquery';


    /**
     * 领域配置列表接口
     * String name; //名称
     String bankNo;//受理机构编号
     */
    public static FIELD_CFG_LIST_URL = '/platdomaincfg/pagingquery';


    /**
     * 新增或编辑
     * Integer id; //主键    编辑时必填
     String name; //名称               *
     String hosts; //域名（* 表示所有）  *
     String descript; //描述               *
     String bankNo;//受理机构编号      *
     String appId; //应用ID            *
     * @returns {Observable<any>}
     */
    public editField(params: any) {
        return this.http.post('/platdomain/save', params);
    }

    /**
     * 状态变更
     * Integer id; //主键    *
     Boolean isEnabled; //是否启用*
     * @returns {Observable<any>}
     */
    public switchState(params: any) {
        return this.http.post('/platdomain/updatestatus', params);
    }

    /**
     * 删除
     * Integer id; //主键    *
     * @returns {Observable<any>}
     */
    public del(params: any) {
        return this.http.post('/platdomain/delete', params);
    }

    /**
     * 获取详情
     * Integer id;//主键 *
     * @returns {Observable<any>}
     */
    public getDetail(params: any) {
        return this.http.post('/platdomain/findbyid', params);
    }


    /**
     * 领域配置详情
     * Integer id;//主键 *
     * @returns {Observable<any>}
     */
    public getCfgDetail(params: any) {
        return this.http.post('/platdomaincfg/findbyid', params);
    }

    /**
     * 领域配置删除
     * Integer id; //主键    *
     * @returns {Observable<any>}
     */
    public configDel(params: any) {
        return this.http.post('/platdomaincfg/del', params);
    }

    /**
     * 领域配置新增或编辑
     * Integer id; //主键    编辑时必填
     Integer domainId; //领域ID            *
     String confName; //领域配置名称   *
     String confCode; //领域配置编码       *
     String confType; //领域配置类型       *
     * @returns {Observable<any>}
     */
    public configSave(params: any) {
        return this.http.post('/platdomaincfg/save', params);
    }


}
