/**
 * Created by cty on 2018/3/1.
 * 员工管理语言包
 * @type {{staff: {listPage: {title: string; search: {userName: string; realName: string; state: string}; tableCols: {userName: string; userPwd: string; realName: string; phone: string; role: string; state: string}}}}}
 */

export const STAFF_MANAGE_LANG = {
    'staff': {
        'listPage': {
            'title': '员工管理',
            'search': {
                'userName': '用户名',
                'realName': '员工姓名',
                'isEnabled': '使用状态',
                'addStaff': '新增员工'
            },
            'tableCols': {
                'userName': '用户名',
                'modifyPwd': '修改密码',
                'userPwd': '密码',
                'realName': '员工姓名',
                'phone': '联系电话',
                'roleAllot': '角色分配',
                'allot': '分配',
                'isEnabled': '使用状态',
                'normal': '正常',
                'frozen': '冻结',
                'delInfo': '您确认要删除该用户吗？',
                'stateChangeA': '您确认要变更当前',
                'stateChangeB': '禁用状态吗？'
            }
        },
        'editPage': {
            'editTitle': '编辑员工',
            'addTitle': '新增员工',
            'userName': '用户名',
            'userPwd': '密码',
            'realName': '员工姓名',
            'phone': '联系电话',
        },
        'modifyPwd': {
            'title': '修改密码',
            'resetPwd': '重新设置密码',
            'confirmPwd': '再次确认密码',
            'pleaseuserPwd': '请输入正确密码',
            'minLength': '最小长度必须为6位',
            'repeatPwd': '两次密码输入不一致'
        },
        'allotRole': {
            'title': '分配角色',
            'baseInfo': '基本信息',
            'saveAndAllot': '保存并分配角色',
            'allotrole': '分配角色',
            'selectRole': '请选择该员工角色(可多选)',
            'selects': '(可多选)'
        },
        'state': {
            'title': '提示',
            'content': '您确认要变更当前【{{0}}】启用状态吗？'
        },
        'hint': {
            'nameErr': '用户名只能输入字母与数字'
        }
    }
}
