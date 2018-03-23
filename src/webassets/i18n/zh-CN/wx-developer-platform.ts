/**
 *  微信开发者平台语言包
 *  Created by lyl on 2018/3/2
 */
export const WX_DEV_PLATFORM_LANG = {
    "WxDevPlatform":{
        "listPage":{
            "title": "微信开发者平台",
            "search":{
                "name":"第三方平台名称",
                "organNo":"受理机构"
            },
            "tableCols":{
                "organName":"受理机构",
                "name":"第三方平台名称",
                "type":"公众账号类型",
                "token":"Token标识",
                "appid":"AppId",
                "remark":"备注",
                "createdAt":"创建时间"
            },
            "expandFields":{
                "appsecret":"Appsecret:",
                "host":"主服务器域名:",
                "authHost":"授权域:",
                "aesKey":"Key:",
                "verifyTicket":"Ticket:"
            },
            "organNoCfg":{
                "title":"查询受理机构",
                "name":"机构名称",
                "orgNo":"机构编号"
            }
        },
        "addPlatformPage": {
            "addTitle": "新增开发者平台",
            "editTitle": "编辑开发者平台",
            "modelFields": {
                "organName": "受理机构",
                "name": "第三方平台名称",
                "type": "公众号类型",
                "appid": "Appid",
                "aesKey": "签名密钥",
                "token": "标识",
                "appsecret": "应用密钥",
                "host": "主服务域名",
                "authHost": "授权域",
                "remark": "备注"
            }
        }
    }
};
