/**
 * ip白名单语言解析
 *  * Created by zll on 2018/3/2
 * @type {{ipWhiteList: {listPage: {tableCols: {policyNo: string; policyName: string; ips: string; updateAt: string}}; addnew: {title: string; apiCodeAny : string; edit: string; organNo: string; apiCode: string; policyNo: string; policyName: string; ips: string}; merchantCfg: {organNoTitle: string; merchantNo: string; name: string}; alert: {del: string}}}}
 */
export const IP_WHITE_LIST= {
    "ipWhiteList":{
        "listPage":{
            "tableCols":{
                "policyNo":"编号",
                "policyName":"名称",
                "ips":"ip",
                "updateAt":"更新日期"
            }
        },
        "addnew":{
            "title":"新增IP白名单",
            "apiCodeAny ":"接口编号",
            "edit":"编辑IP白名单",
            "organNo":"所属商户",
            "apiCode":"接口编号",
            "policyNo":"编号",
            "policyName":"名称",
            "ips":"ip"
        },
        "merchantCfg":{
            "organNoTitle":"查询所属商户",
            "merchantNo":"所属商户编号",
            "name":"所属商户名称"
        },
        "alert":{
            "del":"您确认要删除当前ip白名单信息吗？"
        }





    }
}
