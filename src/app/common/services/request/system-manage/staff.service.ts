import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * Created by cty on 2018/3/1.
 * 员工管理接口
 */

@Injectable()
export class StaffService {
    constructor(public http: HttpService) {}

    /**
     * 列表接口
     * String userName;    //用户名、唯一
     String realName;    //真实姓名
     Integer isEnabled;    //是否启用
     * @type {string}
     */
    public static STAFF_LIST_URL = '/userAction/findByPage';


    /**
     * 员工管理新增/编辑/状态变更
     * Integer   id          编辑必填    *
     string      userName    用户名      *
     String      userPwd     密码        *
     String      phone       联系电话
     String      realName    真实姓名    *
     * @returns {Observable<any>}
     */
    public addOrEdit(params: any) {
        if(params && params['id']) {
            return this.http.post('/userAction/modify', params);
        }
        return this.http.post('/userAction/add', params);
    }

    /**
     * 员工管理获取详情
     * Integer     id          主键编号    *
     * @returns {Observable<any>}
     */
    public getDetail(params: any) {
        return this.http.post('/userAction/findById', params);
    }


    /**
     * 员工管理删除
     * Integer     id          主键编号 *
     * @returns {Observable<any>}
     */
    public del(params: any) {
        return this.http.post('/userAction/del', params);
    }


    /**
     * 员工管理修改密码
     * Integer     id          主键编号    *
     String      userPwd     密码        *
     * @returns {Observable<any>}
     */
    public modifyPwd(params: any) {
        return this.http.post('/userAction/modifyPwd', params);
    }


    /**
     * 获取员工角色
     * Integer     id          主键编号*
     Integer[]   roleIds     角色id集*
     * @returns {Observable<any>}
     */
    public loadRoleList(params: any) {
        return this.http.post('/roleAction/findByList', params);
    }


    /**
     * 分配员工角色保存
     * Integer   id        主键编号*
     Integer[]   roleIds   角色id集*
     * @returns {Observable<any>}
     */
    public allotRole(params: any) {
        return this.http.post('/userAction/allotRole', params);
    }



}
