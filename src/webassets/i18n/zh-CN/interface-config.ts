/**
 * 接口配置翻译解析
 *  * Created by zll on 2018/3/2
 * @type {{logLOG: {listPage: {search: {userName: string; loginTime: string; loginTimeAt: string}}}}}
 */
export const INTERFACE_CONFIG= {
    "interfaceConfig":{
        "listPage":{
            "bankNoCfg":{
                "title":"查询所属机构",
                "orgNo":"所属机构编号",
                "name":"所属机构名称"
            },
            "search":{
                "apiCode":"接口编号",
                "apiName":"接口名称",
                "bankNo":"所属机构",
            },
            "tableCols":{
                "apiCode":"接口编号",
                "apiName":"接口名称",
                "partner":"商户号",
                "subPartner":"子商户号",
                "tradeChan":"支付通道",
                "createdAt":"创建时间",
                "html":{
                    "title":"新增接口配置",
                    "code":"接口编号",
                    "name":"接口名称",
                    "ally":"商户号",
                    "subAlly":"子商户号",
                    "tradeChannel":"支付通道",
                    "agency":"受理机构",
                    "appid":"APPID",
                    "subAppid":"子APPID",
                    "partkey":"签名密钥",
                    "appKey":"应用密钥",
                    "editTitle":"编辑接口配置",
                    "titlelist":"接口配置"


                }

            },
            "alert":{
                "prompt":"提示",
                "opsuc":"操作成功",
                "qusupdate":"您确认要删除当前{{0}}吗？",
            }
        }

    }
}
