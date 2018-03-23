/**
 * 曹组日志列表查询表单字段
 * Created by zll on 2018/3/2
 */

import {BaseForm} from "../base.form";

export class OperationlogForm extends BaseForm{

    public userName:string;  //用户名
    private _createdTime:string; //开始时间
    private _lastCreated:string; //结束时间
    constructor(){
        super();
    }
    get createdTime(){
        return this.isEmpty(this._createdTime) ? this.defTime(0,'YYYY-MM-DD 00:00:00') : this.format(this._createdTime);
    }
    set createdTime(_createdTime:string){
        this._createdTime = _createdTime;
    }
    get lastCreated(){
        if(this._lastCreated == ''){
            return '';
        }
        return this.isEmpty(this._lastCreated) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._lastCreated,'YYYY-MM-DD 23:59:59');
    }
    set lastCreated(_lastCreated:string){
        this._lastCreated = _lastCreated;
    }

}

