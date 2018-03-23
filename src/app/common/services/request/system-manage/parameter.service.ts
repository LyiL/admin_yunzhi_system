import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * Created by cty on 2018/3/1.
 * 参数配置接口
 */

@Injectable()
export class ParameterService {
    constructor(public http: HttpService) {}

    /**
     * 列表接口
     * String keyCode;      //配置项编码
     String confName;       //显示名称
     String moduleCode;     //模块编码（分组）
     * @type {string}
     */
    public static PARAMETER_LIST_URL = '/sysconfig/pagingquery';


    /**
     * 参数配置详情
     * Integer id        主键      *
     * @returns {Observable<any>}
     */
    public getDetail(params: any) {
        return this.http.post('/sysconfig/findbyid', params);
    }


    /**
     * 参数配置新增或编辑
     * Integer id       编辑状态必填      *
     String keyCode     配置项编码   *
     String confName    显示名称    *
     String confType    类型      *
     String moduleCode  模块编码    *
     String value       值           *
     String descript    配置项说明
     Integer isShow     是否在页面显示 *
     Integer domainId   区域      *
     * @returns {Observable<any>}
     */
    public addOrEdit(params: any) {
        if(params && params['id']) {
            return this.http.post('/sysconfig/update', params);
        }
        return this.http.post('/sysconfig/add', params);
    }
}
