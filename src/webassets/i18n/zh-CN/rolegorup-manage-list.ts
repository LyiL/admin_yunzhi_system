/**
 * 角色组管理语言解析
 * Created by zll on 2018/3/2
 * @type {{RM: {listPage: {html: {title: string; add: string; rolez: string; onlysev: string; Becareful: string; hintO: string; hintT: string; hintS: string; serve: string; rolefuncp: string; multiselect: string; pleasefunc: string; savesuc: string; pleaserole: string; pleaseroleName: string; pleasedescription: string; pleaseselect: string; all: string}; search: {roleName: string}; tableCols: {roleName: string; description: string; parentName: string; createdTime: string}; tableActionCfg: {edit: string; del: string; editRole: string; addRole: string}; alert: {title: string}; navigate: {addrole: string}}; nzTitle: {step1Title: string; step2Title: string; step3Title: string}}}}
 */

export const ROLE_GROUP= {
    "roleGroup":{
        "listPage":{
            "html":{
                "title":"角色组管理",
                "add":"新增角色组",
                "rolez":"角色组",
                "onlysev":"仅保存",
                "serve":"保存",
                "rolefuncp":"角色功能权限",
                "multiselect":"（可多选）",
                "pleasefunc":"请选择功能权限",
                "savesuc":"保存成功",
                "pleaserole":"请选择角色菜单权限",
                "pleaseroleName":"请输入角色组名称!",
                "pleaserolecode":"请输入角色组编码!",
                "pleaseroleappId":"请输入APPID!",
                "pleasedescription":"请输入角色描述!",
                "pleaseselect":"请选择",
                "all":"全选"

            },
            "search":{
                "roleName":"角色名称"
            },
            "tableCols":{
                "roleName":"角色组名称",
                "rolecode":"角色组编码",
                "appId":"APPID",
                "description":"角色组描述",
                "orgName":"所属机构",
                "createdTime":"创建时间",


            },
            "tableActionCfg":{
                "edit":"编辑",
                "del":"删除",
                "editRole":"编辑角色",
                "addRole":"新增角色"
            },
            "alert":{
                "title":"您是否确认要删除该角色？",
                "opsuc":"操作成功",
                "number":"只允许输入数字"
            },
            "navigate":{
                "addrole":"新增角色组",
                "addrolegroup":"新增角色组"
            }

        },
        "nzTitle":{
            "step1Title":"基本信息",
            "step2Title":"关联菜单权限",
            "step3Title":"关联功能信息"
        }

    }
}
