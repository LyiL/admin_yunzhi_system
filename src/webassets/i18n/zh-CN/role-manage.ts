/**
 * 系统管理语言解析
 * RM：角色管理语言解析
 * Created by zll on 2018/3/2
 * @type {{RM: {listPage: {html: {title: string; add: string; rolez: string; onlysev: string; Becareful: string; hintO: string; hintT: string; hintS: string; serve: string; rolefuncp: string; multiselect: string; pleasefunc: string; savesuc: string; pleaserole: string; pleaseroleName: string; pleasedescription: string; pleaseselect: string}; search: {roleName: string}; tableCols: {roleName: string; description: string; parentName: string; createdTime: string}; tableActionCfg: {edit: string; del: string; editRole: string; addRole: string}; alert: {title: string}; navigate: {addrole: string}}; nzTitle: {step1Title: string; step2Title: string; step3Title: string}}; StaffM: {listPage: {html: {title: string; add: string; normal: string; frozen: string; distribution: string; updatePsd: string; pleaseallorole: string; save: string; cal: string; rolesuc: string; qus: string; savesuc: string; userName: string; realName: string; userPwd: string; phone: string; bank: string; onlysave: string; saverole: string; pleaseuserPwd: string; Pwdminlength: string; confirmuserPwdc: string; pleasephone: string; pleasemaxlength: string; pleaserealName: string; pleaseuserName: string; pleaseuserNamecon: string; all: string}; search: {userName: string; realName: string; isEnabled: string}; tableCols: {userName: string; b: string; realName: string; phone: string; allocation: string; isEnabled: string; enable: string; disable: string}; tableActionCfg: {edit: string; del: string}; alert: {psdModify: string; psdModifySU: string; qusdeluser: string; prompt: string; qusupdate: string; status: string; opsuc: string; enablesuc: string; disablesuc: string}; navigate: {addstaff: string; editstaff: string; staffmanage: string}}; nzTitle: {step1Title: string; step2Title: string; step3Title: string}}; staffPsd: {html: {userPwd: string; userPwdc: string; qus: string; cancel: string}}}}
 */
export const ROLE_MANAGE = {
    "RM":{
        "listPage":{
            "html":{
                "title":"角色管理",
                "add":"新增角色",
                "rolez":"角色组",
                "onlysev":"仅保存",
                "Becareful":"注意",
                "hintO":"各平台编辑角色时,暂时能选择该平台所有角色组",
                "hintT":"但只有归属于平台员工角色组的角色,才可以分配给员工",
                "hintS":"其他类型角色组暂未使用",
                "serve":"保存",
                "rolefuncp":"角色功能权限",
                "multiselect":"（可多选）",
                "pleasefunc":"请选择功能权限",
                "savesuc":"保存成功",
                "pleaserole":"请选择角色菜单权限",
                "pleaseroleName":"请输入角色名称!",
                "pleasedescription":"请输入角色描述!",
                "pleaseselect":"请选择",
                "all":"全选"

            },
            "search":{
                "roleName":"角色名称"
            },
            "tableCols":{
                "roleName":"角色名称",
                "description":"角色描述",
                "parentName":"所属角色组",
                "createdTime":"创建时间"

            },
            "tableActionCfg":{
                "edit":"编辑",
                "del":"删除",
                "editRole":"编辑角色",
                "addRole":"新增角色"
            },
            "alert":{
                "title":"您是否确认要删除该角色？",
                "prompt":"提示",
                "opsuc":"操作成功"

            },
            "navigate":{
                "addrole":"新增角色"
            }

        },
        "nzTitle":{
            "step1Title":"基本信息",
            "step2Title":"关联菜单权限",
            "step3Title":"关联功能信息"
        }

    }
}
