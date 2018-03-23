import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
/**
 * 全局监听器服务
 */
@Injectable()
export class GlobalMonitorService{
  /**
   * 数据字段监听事件
   * @type {BehaviorSubject<any>}
   */
  public systemCfgSubject:BehaviorSubject<any> = new BehaviorSubject<any>({});

  /**
   * 权限功能数据监听事件
   * @type {BehaviorSubject<any[]>}
   */
  public funcDataSubject:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /**
   * 获取功能数据
   * @returns {any[]}
   */
  public get funcData(){
    return this.funcDataSubject.getValue();
  }

  /**
   * 获取系统配置信息数据
   * @returns {any}
   */
  public get sysCfgData(){
    return this.systemCfgSubject.getValue();
  }
}
