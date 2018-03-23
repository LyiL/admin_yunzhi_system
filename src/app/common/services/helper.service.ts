import {ObjectExtend} from "ng-zorro-antd";
import {GlobalMonitorService} from "./global.monitor.service";
import {CommonEnum} from "../enum/common.enum";
import {Injectable} from "@angular/core";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import * as moment from "moment";
import {ReuseTabService} from "@delon/abc";

/**
 * 辅助类
 */
@Injectable()
export class HelperService{
    constructor(private globalMonitorService:GlobalMonitorService,private objectExtend:ObjectExtend,private menuService:MenuService,private router:Router,private reuseTabService:ReuseTabService){}
    /**
     * 判断是否有值
     * @param param
     * @returns {boolean}
     */
    isEmpty(param:any):boolean{
        if(param === '' || param == undefined || param == null || param == 'null'){
            return true;
        }
        return false;
    }
    /**
     * 将KEY翻译为对应显示值
     * @param key 翻译KEY
     * @param val 需要翻译的值
     * @param transField 翻译字段名
     * @param transReturnField 翻译返回字段名
     * @returns {string} 返回翻译返回字段对应值
     */
    dictTrans(key: string, val: any, transField:string|undefined=undefined,transReturnField:string|undefined=undefined): any {
        let _transValue = '';
        transField = transField ? transField : 'id';
        transReturnField = transReturnField ? transReturnField : 'name';

        let dictVal = this.getDictByKey(key);
        if(dictVal && dictVal instanceof Array){
            dictVal.forEach((item)=>{
                if(item[transField] == val){
                    _transValue = item[transReturnField];
                }
            });
        }

        return _transValue;
    }

    /**
     * 获取字典值
     * @param key 获取的KEY
     * @returns {any} 返回对应KEY的值
     */
    getDictByKey(key: string): any {
        let dict:any;
        let sysCfgData = sessionStorage.getItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.SYSTEM_CFG);
        if(sysCfgData){
            sysCfgData = JSON.parse(sysCfgData || 'null');
        }
        if(sysCfgData != null){
            return sysCfgData[key];
        }
        return dict;
    }

    /**
     * 获取功能权限数据
     * @returns {any}
     */
    funcsData():any[]{
        if(this.globalMonitorService.funcData && this.globalMonitorService.funcData.length == 0){
            let _func = sessionStorage.getItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.FUNCS);
            if(!this.objectExtend.isEmpty(_func)){
                return JSON.parse(_func);
            }
            return [];
        }
        return this.globalMonitorService.funcData;
    }

    /**
     * 判断按钮是否有权限
     * @param btnKey
     * @returns {boolean}
     */
    btnRole(btnKey:string):boolean{
        let _funcDatas = this.funcsData();
        if(_funcDatas && _funcDatas[btnKey]){
            return true;
        }
        return false;
    }

    /**
     * 时间格式化
     * @param value 值
     * @param format 格式 以moment中的格式，默认为 YYYY-MM-DD HH:mm:ss
     * @returns {any} 返回格式化后的值
     */
    dateFormat(value:any,format:string='YYYY-MM-DD HH:mm:ss'){
        if(this.objectExtend.isEmpty(value)){
            return ' / ';
        }
        let _moment = moment(value);
        return _moment.format(format);
    }

    /**
     * 调整时间
     * @param value 原始值，单位：毫秒
     * @param modifyValue 调整值，number
     * @param modifyType 调整类型，'years'：年，'quarters'：季度，'months'：月份，'weeks'：周，'days'：天，'hours'：小时，'minutes'：分钟，'seconds'：秒，'milliseconds'：毫秒， 默认为天
     * @returns {number} 返回调整后的时间毫秒
     */
    modifyDateByDay(value:any,modifyValue?:number,modifyType:'years'|'quarters'|'months'|'weeks'|'days'|'hours'|'minutes'|'seconds'|'milliseconds' = 'days'){
        if(this.objectExtend.isEmpty(value)){
            throw new Error('The time value cannot be empty.');
        }
        let _moment = moment(value);
            if(modifyValue !== 0){
                _moment.add(modifyValue,modifyType);
            }
        return _moment.toDate().getTime();
    }
    /**
     * 数值转译方法
     * @param value 转译值
     * @param isRate 转译类型，multiplication：乘法，division：除法，original：原始，默认 multiplication
     * @param rate 转译大小，默认 1000
     * @returns {any}
     */
    numberTrans(value:any,isRate:'multiplication'|'division'|'original' = 'multiplication',rate:number = 1000){
        if(isRate == 'multiplication'){
            return value * rate;
        }else if(isRate == 'division'){
            return (value * 100) / (rate * 100);
        }
        return value;
    }

    /**
     * 跳转地址
     * @param url 路由地址
     * @Param title 路由名称
     * @param params 请求参数
     * @param isRefresh 判断是否需要触发刷新事件,默认为不触发刷新事件
     */
    navigate(url,title:string,params:any,isRefresh:boolean = false){
        let _pUrl = this.router.url;
        this.updateMenuData({text:title,link:url,params:params,hide:true,children:[]},_pUrl);
        this.menuService.addSubMenu({text:title,link:url,params:params,hide:true,children:[]},_pUrl);
        let goMenu = this.menuService.getUrlByMenu(_pUrl);
        if(isRefresh === true){
            let urls = url.split('/');
            let pageName = '';
            if(urls.length > 2){
                pageName = urls[urls.length-2]+'/'+urls[urls.length-1];
            }
            this.reuseTabService.refresh(pageName);
        }
        this.router.navigate([url]);
    }

    private updateMenuData(_menu:any,url){
        let menuData:any = sessionStorage.getItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.TREES);
        if(menuData){
            menuData = JSON.parse(menuData);
            if(menuData){
                menuData[0]['children'].forEach((menu:any,index:number)=>{
                    menu['children'] && menu['children'].forEach((subMenu:any,subIndex:number)=>{
                        if(subMenu['link'] == url){
                            if(subMenu['children'].length == 0){
                                subMenu['children'].push(_menu);
                            }else{
                                let _tIndex:number = -1,_tMenu = subMenu['children'].find((tMenu:any,tIndex:number)=>{
                                    if(tMenu['link'] == _menu['link']){
                                        _tIndex = tIndex;
                                        return true;
                                    }
                                    return false;
                                });
                                if(_tMenu){
                                    subMenu['children'][_tIndex]['text'] = _menu['text'];
                                    subMenu['children'][_tIndex]['params'] = _menu['params'];
                                }else{
                                    subMenu['children'].push(_menu);
                                }
                            }
                        }
                    });
                });
                sessionStorage.setItem(CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.TREES, JSON.stringify(menuData));
            }

        }
    }
}
