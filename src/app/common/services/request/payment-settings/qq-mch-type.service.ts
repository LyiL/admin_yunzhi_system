import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * QQ商户类型数据源
 * Created by hux on 2018/3/1
 */
@Injectable()
export class QQMchTypeService {
    constructor(private http:HttpService){
    }

    /**
     * QQ商户类型列表查询地址
     */
    public static QQ_MCH_TYPE_LIST_URL = '/dealercategoryqq/searchforpage';

    /**
     * 新增QQ商户类型
     * @param params {
     *  parent:string QQ父商户类型编号
     *  typeName:string QQ商户类型名称 *
     *  typeNo:string QQ商户类型编号 *
     *  categoryNo:string ULO商户类型编号
     * }
     * @return {Observable<any>}
     */
    add(params:any):Observable<any>{
        return this.http.post('/dealercategoryqq/save',params);
    }

    /**
     * 修改QQ商户类型
     * @param params {
     *  id:number 主键 *
     *  parent:string QQ父商户类型编号
     *  typeName:string QQ商户类型名称 *
     *  typeNo:string QQ商户类型编号 *
     *  categoryNo:string ULO商户类型编号
     * }
     * @return {Observable<any>}
     */
    update(params:any):Observable<any>{
        return this.http.post('/dealercategoryqq/update',params);
    }

    /**
     * 删除QQ商户类型
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    delete(params:any):Observable<any>{
        return this.http.post('/dealercategoryqq/delete',params);
    }

    /**
     * 查询QQ商户类型详情
     * @param params {
     *  id:number 主键id *
     * }
     * @return {Observable<any>}
     */
    findDetail(params:any):Observable<any>{
        return this.http.post('/dealercategoryqq/detail',params);
    }
}
