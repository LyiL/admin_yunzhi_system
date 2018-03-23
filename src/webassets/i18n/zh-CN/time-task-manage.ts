/**
 * Created by cty on 2018/3/1.
 * 定时任务语言包
 * @type {{timeTask: {listPage: {title: string; search: {userName: string; realName: string; state: string}; tableCols: {userName: string; userPwd: string; realName: string; phone: string; role: string; state: string}}}}}
 */

export const TIME_TASK_LANG = {
    'timeTask': {
        'listPage': {
            'title': '定时任务',
            'search': {
                'taskName': '任务名称',
                'groupName': '任务所属分组',
                'addTask': '新增任务'
            },
            'tableCols': {
                'id': '任务编码',
                'taskName': '任务名称',
                'groupName': '分组名称',
                'cronExp': '执行时间',
                'cronDesc': '时间描述',
                'useState': '启用状态',
                'runState': '运行状态',
                'lastBeginTime': '上次开始执行时间',
                'lastEndTime': '上次结束执行时间',
                'asynBtn': '异步执行',
                'editTask': '编辑定时任务',
                'addTask': '新增定时任务'
            }
        },
        'editPage': {
            'editTitle': '编辑定时任务',
            'addTitle': '新增定时任务',
            'id': '任务编码',
            'taskName': '任务名称',
            'groupName': '分组名',
            'cronExp': '执行时间',
            'cronDesc': '时间描述',
            'targetClass': '执行目标类',
            'outsideParams': '外部参数',
            'descript': '任务描述',
        },
        'hint': {
            'asyn': '确定要立即异步执行该定时任务?',
            'isAsyn': '该定时任务不可用，请先启用该定时任务!',
            'delInfo': '您确认要删除当前【{{0}}】定时任务吗？',
        }
    }
}
