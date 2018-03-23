/**
 * 登录日志翻译解析
 *  * Created by zll on 2018/3/2
 * @type {{logLOG: {listPage: {search: {userName: string; loginTime: string; loginTimeAt: string}}}}}
 */
export const LOGINGLOG_LIST= {
    "logLOG":{
        "listPage":{
            "search":{
                "userName":"用户名",
                "loginTime":"登录开始时间",
                "lastLoginAt":"登录结束时间",
                "loginAt":"登录时间"
            },
            "tableCols":{
                "loginTime":"登陆时间",
                "userName":"用户名",
                "realName":"真实姓名",
                "ipaddress":"IP",
                "remark":"备注"
            },
            "alert":{
                "pleaseTime":"请输入登录时间",
                "compare":"开始时间不能大于结束时间!"
            }
        }

    }
}
