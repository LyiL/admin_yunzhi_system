/**
 * 操作日志翻译解析
 *  * Created by zll on 2018/3/2
 * @type {{logLOG: {listPage: {search: {userName: string; loginTime: string; loginTimeAt: string}}}}}
 */
export const OPERATIONLOG_LIST= {
    "operationLog":{
        "listPage":{
            "search":{
                "userName":"用户名",
                "loginTime":"操作开始时间",
                "loginTimeAt":"操作结束时间",
                "logTime":"操作时间"
            },
            "tableCols":{
                "createdTime":"操作时间",
                "userName":"用户名",
                "realName":"真实姓名",
                "ipaddress":"IP",
                "targetName":"目标名称",
                "actionName":"请求名称",
                "requestUrl":"请求地址",
                "descript":"备注"
            },
            "alert":{
                "pleaseTime":"请输入操作时间"
            }
        }

    }
}
