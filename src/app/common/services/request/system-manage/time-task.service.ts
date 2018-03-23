import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * Created by cty on 2018/3/1.
 * 定时任务接口
 */

@Injectable()
export class TimeTaskService {
    constructor(public http: HttpService) {}

    /**
     * 列表接口
     * String taskName;// 定时任务名字
     String groupName; // 定时任务分组
     * @type {string}
     */
    public static TIME_TASK_LIST_URL = '/payschedulertask/pagingquery';


    /**
     * 获取详情
     * String id; //主键 *
     * @returns {Observable<any>}
     */
    public getDetail(params: any) {
        return this.http.post('/payschedulertask/findbyid', params);
    }


    /**
     * 新增/编辑
     * String id; //主键    编辑时必填
     String taskName;// 定时任务名字       *
     String groupName; // DEFAULT NULL,定时任务分组        *
     String cronExp ;//执行时间表达式       *
     String  targetClass ;//目标类      *
     String  cronDesc;//定时时间描述       *
     String descript;//描述说明
     String outsideParams;//外部参数
     * @returns {Observable<any>}
     */
    public addOrEdit(params: any) {
        return this.http.post('/payschedulertask/save', params);
    }


    /**
     * 删除
     * String id;  //主键    *
     * @returns {Observable<any>}
     */
    public del(params: any) {
        return this.http.post('/payschedulertask/del', params);
    }


    /**
     * 变更状态
     * String id;  //主键    *
     Integer useState;  // 使用状态 ,默认0 *
     * @returns {Observable<any>}
     */
    public switchState(params: any) {
        return this.http.post('/payschedulertask/updatestatus', params);
    }

    /**
     * 异步执行
     * Integer id; //主键    *
     * @returns {Observable<any>}
     */
    public taskAsyc(params: any) {
        return this.http.post('/task/paytask/excute/' + params['id']);
    }
}
