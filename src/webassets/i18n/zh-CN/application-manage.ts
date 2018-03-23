/**
 * 应用管理模块的语言包
 */
export const APP_MANAGE_LANG = {
    "AppManage": {
        "listPage": {
            "title": "应用管理",
            "search": {
                "appname": "应用名称",
                "appCode": "应用ID"
            },
            "tableCols": {
                "appname": "应用名称",
                "appCode": "应用ID",
                "signkey": "签名KEY",
                "description": "描述",
                "admin": "管理员账号"
            },
            "linkBtn": {
                "addAdmin":"添加管理员账号",
                "modulesManage":"模块管理"
            },
            "appManageWin": {
                "title":"应用",
                "appCode":"APPID",
                "appname":"应用名称",
                "description":"描述"
            },
            "appAdminWin":{
                "addTitle": "添加管理员账号",
                "editTitle": "编辑管理员信息",
                "realName": "真实姓名",
                "userName": "用户名",
                "userPwd": "用户密码",
                "confirmPass": "确认密码",
                "confirmPswError": "确认密码需与用户密码一致!",
                "minlengthError":"请输入至少六位长度的密码！"
            },
            "tips":{
                "deleteAppTip": "您确认要删除当前【{{0}}】应用吗？"
            }
        },
        "moduleManagePage": {
            "modelFields": {
                "pTitle": "父模块名称",
                "name": "模块名称",
                "ordered": "模块排序",
                "iconClass": "模块图标样式类",
                "module": "请求地址",
                "roles": "角色",
                "appCode": "模块源码",
                "isShow": "是否激活",
                "isSysMenu": "是否为系统菜单",
            },
            "btns": {
                "addParentNode": "添加父节点",
                "addChildNode": "添加子节点",
                "editNode": "编辑节点",
                "delNode": "删除节点",
            },
            "tips":{
                "addChildTip": "请先选择相应的父节点",
                "editNodeTip": "请先选择需要修改的节点",
                "deleteNodeTip": "请先选择需要删除的节点",
                "deleteTip": "您确认要删除当前【{{0}}】节点吗？",
            }
        }
    }
};
