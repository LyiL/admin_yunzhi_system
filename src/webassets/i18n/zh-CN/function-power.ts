/**
 * Created by cty on 2018/3/1.
 * 功能权限管理语言包
 * @type {{functionPower: {listPage: {titie: string; search: {authcode: string; actionName: string; authgroup: string; appId: string}; tableCols: {authcode: string; actionName: string; authgroup: string; appId: string; actionPath: string; orderBy: string}}}}}
 */

export const FUNCTION_POWER_LANGE = {
    'funcPower': {
        'listPage': {
            'titie': '功能权限管理',
            'search': {
                'authcode': '功能编号',
                'actionName': '功能名称',
                'authgroup': '功能分组',
                'appId': 'APPID',
            },
            'tableCols': {
                'authcode': '功能编码',
                'actionName': '功能名称',
                'authgroup': '功能组',
                'appId': 'APPID',
                'actionPath': '功能路径',
                'orderBy': '排序',
            }
        },
        'addFuncPower': {
            'addTitle': '新增功能权限',
            'editTitle': '编辑功能权限',
            'appId': 'APPID',
            'authgroup': '功能组',
            'authcode': '功能编码',
            'actionName': '功能名称',
            'actionPath': '功能路径',
            'orderBy': '排序',
            'actionParm': '请求包含的参数',
            'orderByLength': '排序必须为5位以上的正整数'
        },
        'searchWin': {
            'title': '查询功能组',
            'functionList': '功能列表',
            'appId': '应用ID',
            'hint': '请先输入APPID！'
        }
    }
}
