/**
 * 中心管理翻译语言包
 * @type {{Mch: {Validate: {name: string; shortName: string; orgEmail: string; orgEmailForm: string; orgWebsite: string; comAddress: string; linenceNo: string; customerPhone: string; operator: string; operatorIdno: string; linkman: string; phone: string; email: string}; title: string; All: string; mchDetail: string; step: {title: string; baseInfo: {tips: {fail: string}; legTitle: {companyInfo: string; operatorInfo: string; linkmanInfo: string; otherInfo: string; image: string}; title: string; model: {name: string; chanNo: string; agencyName: string; shortName: string; orgEmail: string; orgWebsite: string; Address: string; province: string; city: string; county: string; comAddress: string; certificateType: string; linenceNo: string; linenceTerm: string; linenceTermStart: string; linenceTermEnd: string; mchRole: string; categoryTypeGroup: string; customerPhone: string; creator: string; operator: string; operatorIdno: string; operatorPhone: string; operatorEmail: string; contactsType: string; linkman: string; phone: string; email: string; linenceImg: string; orgAccountImg: string; indentityImg: string; indentityBackImg: string; bankCardImg: string}}; accountInfo: {title: string; tips: {transId: string; type: string}}; productInfo: {title: string}; channelInfo: {title: string}}; listPage: {search: {name: string; merchantNo: string; examState: string; chanNo: string; ally: string; centerId: string}; ChanCfg: {title: string; chanNo: string; chanName: string}; creatorCfg: {title: string; salesmanId: string; realName: string}; CenterCfg: {title: string; centerId: string; centerName: string}; subBankCfg: {title: string; linkNo: string; subBankName: string}; tableCols: {name: string; merchantNo: string; shortName: string; chanName: string; examState: string}}; detailPage: {operationInfo: string; operator: string; imageShow: string; detail: {title: string; ExamineTitle: string; info: {infoTitle: string; enterpriseInform: string; chanName: string; name: string; shortName: string; merchantNo: string; orgEmail: string; provinceName: string; address: string; certificateType: string; linenceNo: string; linenceTermStart: string; categoryType: string; orgWebsite: string; customerPhone: string; salesmanName: string; createdTime: string; examTime: string; principalInfo: string; operator: string; contactsType: string; operatorIdno: string; operatorPhone: string; operatorEmail: string; contactInfo: string; linkman: string; email: string; phone: string; accessoryInfo: string; linenceImg: string; orgAccountImg: string; indentityImg: string; indentityBackImg: string; bankCardImg: string}; accountInfo: string; accountTable: {name: string; type: string; bankCardno: string; bankName: string; subbranchName: string; subbanrchCode: string; transId: string; cardType: string}; channelInfo: string; channelTable: {transId: string; ptCenterId: string; providerNo: string; applyState: string; ally: string; thirdAppid: string; pcmPartkey: string; categoryType: string; limitDay: string; limitDeal: string; limitSingleMin: string; limitSingle: string; settleRate: string; fixFloatRate: string; settleCycle: string; shareRule: string; used: string}}; openProduct: {title: string; titleInfo: string; prodTable: {combName: string; combNo: string; state: string}; prodDetail: {transId: string; categoryType: string; limitDay: string; limitSingleMin: string; limitSingle: string; settleRate: string; fixFloatRate: string; settleCycle: string; shareRule: string; used: string; editCommitBtn: string; closeProdBtn: string; openProdBtn: string; passBtn: string; rejectBtn: string; anewOpen: string}; hint: {closeProdHint: string; closeProdSuccess: string}}; channelCfg: {detailTitle: string; title: string; toAudit: string; handing: string; success: string; fail: string; riskCTR: string; usedOk: string; usedNo: string}; infoCfg: {title: string}}; btn: {searchBtn: string; into: string; reInto: string; addBtn: string; onAuthenticationBtn: string}; tips: {onAuthenticationTips1: string; onAuthenticationConfirm1: string; onAuthenticationConfirm2: string; onAuthenticationTipsOk: string; ptCenterId: string; intoSuccess: string; reIntoSuccess: string; SendEmailAndSTM: string; SendEmailAndSTMSuccess: string; transId: string; chanNo: string}}}}
 */
export const CENTER_MANAGE_LANG = {
    "CenterManger":{
        "title":"受理机构",
        "All":"全部",
        "listPage":{
            "search":{
                "name":"机构名称",
            },
            "subBankCfg":{
                "title":"查询开户支行",
                "linkNo":"开户支行编号",
                "subBankName":"开户支行名称"
            },
            "BankInfoCfg":{
                "title":"银行列表",
                "name":"银行名称",
                "bankDigitalCode":"银行编码"
            },
            "tableCols":{
                "organNo":"机构编号",
                "name":"机构名称",
                "prefixName":"机构缩写",
                "settleCycle":"渠道结算周期",
                "sivrate":"技术服务手续费‰",
                "status":"审核状态",
                "mermanage":"商户号管理",
                "accmanage":"账户配置管理",
                "paymanage":"支付管理",
                "recmanage":"对账管理",
                "syncfg":"同步配置",
                "serviceManage":"服务商管理",
                "resetpwd":"重置密码",
            },
            "win":{
                "status":"状态"
            }
        },
        "setAccount":{
            "title":"设置结算账户",
            "serveTitle":"设置服务费账户",
            "name":"账户名称",
            "type":"账户类型",
            "acntIdentity":"开户身份证号",
            "bankCardno":"银行卡号",
            "bankName":"银行名称",
            "bankCode":"银行编号",
            "subbranchName":"开户支行",
            "subbanrchCode":"联行号",
            "cardType":"行内帐户",
            "detail":{
                "title":"详情",
                "ExamineTitle":"审核",
                "accountInfo":"账户信息",
                "accountTable":{

                },
            },
        },
        "addAcceptIns":{
            "AddTitle":"新增受理机构",
            "editTitle":"编辑受理机构",
            "organName":"机构名称",
            "bankShortName":"机构简称",
            "ruleType":"手续费计算",
            "preEnName":"机构缩写",
            "techRate":"服务手续费(‰)",
            "expCls":"结算行内导出",
            "contName":"联系人姓名",
            "expOutCls":"结算行外导出",
            "phone":"联系人电话",
            "cashSyncSrv":"结算服务导出",
            "email":"联系邮箱",
            "settleCycle":"结算周期",
            "address":"详细地址",
            "remark":"机构备注",
            "expPubCls":"结算对公导出",
            "expPriCls":"结算对私导出"
        },
        "mchCfg":{
            "addTitle":"新增商户号",
            "editTitle":"编辑商户号",
            "title":"商户号配置",
            "companion":"商户号",
            "listPage":{
                "companion":"商户号",
                "companionName":"商户名称",
                "payAccountName":"支付账户名称",
                "payAccountCardno":"支付账户号",
                "exportClass":"导出实体类",
                "createTime":"创建日期"
            }
        },
        "payManage":{
            "addTitle":"新增支付配置",
            "editTitle":"编辑支付配置",
            "plusTitle":"添加支付配置",
            "Title":" 编辑支付类型",
            "tip1":"请先选择关联受理机构",
            "tip2":"请选择关联支付中心",
            "tip3":"请选择关联受理机构",
            "TransIdCfg":{
                "title":"支付接口",
                "transType":"支付接口名称",
                "transId":"代码"
            },
            "payPlus":{
                "transId":"支付接口",
                "centerPattern":"支付模式",
                "tradeChan":"支付通道",
                "wxOauthAppid":"微信授权APPID",
                "companion":"父商户号",
                "subCompanion":"子商户号",
                "appid":"APPID",
                "subAppid":"子APPID",
                "signkey":"签名密钥",
                "currency":"交易币种",
                "refundId":"退款账号",
                "refundPwd":"退款密码",
                "notifyUrl":"通知地址",
                "callbackUrl":"回调地址"
            },
            "refundCategory":{
                "title":"编辑退款策略",
                "limitDayRange":"允许退款天数",
                "singleRefundFee":"单笔退款金额",
                "dayRefundFee":"当日退款金额",
                "dayRefundCount":"当日退款笔数",
                "state":"启用状态",
                "updateRemark":"修改时的备注",
            },
            "title":"支付中心设置",
            "name":"支付中心名称",
            "settleParty":"结算方",
            "used":"已启用",
            "unUsed":"已停用",
            "otherCenterIdCfg":{
                "title":"支付中心列表",
                "otherCenterId":"支付中心Id",
                "otherCenterName":"支付中心名称"
            },
            "otherCenterBankCfg":{
                "title":"机构列表",
                "otherCenterBank":"机构编号",
                "otherCenterBankName":"机构名称"
            },
            "listPage":{
                "name":"支付中心名称",
                "settleParty":"结算方",
                "tradeType":"支付模式",
                "settleType":"结算类型",
                "settleRate":"成本费率‰",
                "chaProfitType":"分润类型",
                "feeRuleType":"手续费配置",
                "bankCard":"银行卡号",
                "bankCardName":"开户姓名",
                "bankName":"银行名称",
                "otherCenterBank":"关联受理机构",
                "otherCenterId":"关联支付中心",
                "descript":"备注",
                "isDeleted":"启用状态",
                "transType":"支付类型",
                "transId":"支付接口",
                "createdTime":"添加日期",
                "updatedTime":"更新日期",
                "centerPattern":"支付模式"
            }
        },
        "billCfg":{
            "addTitle":"新增对账单配置",
            "editTitle":"编辑对账单配置",
            "Title":" 对账单配置",
            "billAdd":{

            },
            "listPage":{
                "companion":"第三方商户号",
                "billType":"对账单类型",
                "downClass":"下载类",
                "classParams":"下载类对应参数",
                "parseClass":"解析对账类",
                "downTimes":"允许下载时间段",
                "downTime":"允许下载时间段(0-24点)",
                "downBegin":"下载开始时间(0-24点)",
                "downEnd":"下载结束时间段（0-24点）",
            }
        },
        "syncMch":{
            "addTitle":"新增商户号",
            "editTitle":"编辑商户号",
            "title":"同步商户配置",
            "ali":"支付宝配置",
            "qq":"QQ配置",
            "wx":"微信配置",
            "payInfoCfg":{
                "title":"支付中心列表",
                "name":"支付中心名称",
            },
        },
        "SCManage":{
            "addTitle":"新增证书",
            "Title":" 安全证书",
            "uploadC":" 证书上传",
            "uploadBtn":" 立即上传",
            "scAdd":{
                "certType":"证书类型",
                "centerId":"支付中心",
                "thridMerchantNo":"第三方商户号",
                "certPwd":"证书密码",
                "refundUserId":"退款用户名",
                "refundUserPwd":"退款密码",
            },
            "listPage":{
                "certType":"证书类型",
                "certName":"名称",
                "thridMerchantNo":"第三方商户号",
                "certSet":"证书上传状态",
                "yes":"证书已上传",
                "no":"证书未上传",
                "Yes":"已上传",
                "No":"未上传"
            }
        },
        "btn":{
            "searchBtn":"查询",
            "cfgBtn":"配置",
            "setBtn":"设置",
            "resetBtn":"重置",
            "buildBtn":"创建",
            "settleAccBtn":"设置结算账户",
            "serviceAccBtn":"设置服务费账户",
            "addBtn":"添加",
            "newBtn":"新增",
            "payType":"支付类型",
            "refundCategoryBtn":"退款策略",
            "look":"查看",
            "onAuthenticationBtn":"批量认证",
            "upload":"证书上传",
            "download":"下载",
        },

        "tips":{
           "createDefaultChan1": "确认要在【{{0}}】下创建默认代理商和服务商？",
            "createDefaultChan2": "下创建默认代理商和服务商？",
            "createDefaultChan3": "创建成功",
            "resetPwd1": "您确认要重置【{{0}}】的登录密码吗？",
            "resetPwd2": "的登录密码吗？",
            "resetPwd3": "重置成功",
            "examine": "【{{0}}】未审核",
            "mchDel1":"您确认要删除当前【{{0}}】节点吗？",
            "mchDel2":"节点吗？",
            "pcDisable1": "您确认要变更【{{0}}】启用状态吗？",
            "pcDisable2": "启用状态吗？",
            "billDel1":"您确认要删除【{{0}}】吗？",
            "billDel2":"吗？",
            "SCDel1":"您确认要删除当前证书吗？",
            "download":"下载成功！",
            "uploadErr":"上传出错！",
            "uploadSuccess":"上传成功！",
            "fee":"单笔退款金额不能大于当日退款金额",
            "count":"当日退款笔数不能大于2000000000",
            "limitSingleFee":"单笔退款金额不能大于20000000",
            "limitDayFee":"当日退款金额不能大于20000000",
            "days":"退款天数不能大于100天",
            "Pwdminlength":"密码长度不小于6位!",
            "countLength":"当日退款笔数不能大于5位数!",
            "fitTime":"请输入正确的时间（0-24）!",
            "TimeErr":"开始时间不能大于结束时间!",
            "cert":"请点击【本地文件】选择证书上传",
        }
    }
};
