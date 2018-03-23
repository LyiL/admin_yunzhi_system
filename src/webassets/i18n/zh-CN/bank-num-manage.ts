/**
 * 联行号管理翻译解析
 *  * Created by zll on 2018/3/2
 * @type {{logLOG: {listPage: {search: {userName: string; loginTime: string; loginTimeAt: string}}}}}
 */
export const BANK_NUM_MANAGE= {
    "bankNumManage":{
        "listPage":{
            "search":{
                "identification":"银行卡号标识",
                "bankName":"银行名称",
            },
            "tableCols":{
                "identification":"银行卡号标识",
                "bankNumberlength":"卡号长度",
                "bankCode":"银行编号",
                "bankName":"银行简称",
                "bankallName":"银行全称",
                "bankNumber":"银联号",
                "edit":"编辑银联号"
            }

        },
        "addNew":{
            "title":"新增银联号",
            "cardBin":"银行卡号标识",
            "cardLeg":"卡号长度",
            "orgBankno":"银行编号",
            "smallName":"银行简称",
            "fullName":"银行全称",
            "bankLinkno":"银联号",
        },
        "alert":{
            "opsuc":"操作成功"
        }

    }
}
