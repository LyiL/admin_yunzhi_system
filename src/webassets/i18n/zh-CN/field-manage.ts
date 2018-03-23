/**
 * Created by cty on 2018/3/1.
 * 领域管理语言包
 * @type {{fieldManage: {listPage: {title: string}}}}
 */

export const FIELD_MANAGE_LANG = {
    'fieldManage': {
        'listPage': {
            'title': '领域管理',
            'search': {
                'bankName': '受理机构',
                'addFieldBtn': '添加领域',
                'fieldConfigBtn': '领域配置管理'
            },
            'tableCols': {
                'id': '编号',
                'name': '领域名称',
                'hosts': '主域名',
                'bankName': '受理机构',
                'appId': '应用ID',
                'state': '使用状态',
                'createdTime': '创建时间',
                'editField': '编辑领域配置',
                'switchState': '您确认要变更当前状态吗？'
            },
            'editFieldWin': {
                'editTitle': '编辑领域',
                'addTitle': '新增领域',
                'name': '领域名称',
                'hosts': '主域名',
                'descript': '领域描述',
                'bankNo': '受理机构',
                'appId': '应用ID'
            }
        }
    },
    'fieldConfig': {
        'listPage': {
            'title': '领域配置管理',
            'search': {
                'name': '领域名称',
                'confName': '配置名称',
                'confCode': '配置编码',
                'confType': '配置类型',
                'addField': '添加领域配置'

            },
            'tableCols': {
                'confName': '配置名称',
                'confCode': '配置编码',
                'confType': '配置类型',
                'confContent': '配置值',
                'confDescript': '配置描述',
                'delInfo': '您确认要删除当前【{{0}}】领域配置吗？',
            }
        },
        'addFieldConfig': {
            'title': '配置信息',
            'editTitle': '编辑领域配置',
            'addTitle': '新增领域配置',
            'confCode': '配置项编码',
            'confName': '显示名称',
            'confType': '类型',
            'imgUpload': '图片上传',
            'confProperty': '配置项属性',
            'confContent': '默认值',
            'confDescript': '配置项说明',
            'hintTitle': '注意',
            'hintA': '1、类型为："select"时，必须填写[存储范围]字段，格式为：格式为："id":"111","name":"选择项一","id":"222","name":"选择项二","id":"333","name":"选择项三"',
            'hintB': '2、[配置项属性]字段是为 "POPUP","SELECT", "IMAGE"控件配置相关配置信息所用,配置参数请参照对应的系统控件',
            'hintC': '3、[分组]字段必须以功能取名',
            'hintD': '4、[配置项说明]字段是用来说明当前配置的说明，请写详细点，让客户能清晰配置用途',
        }
    },
    'config': {
        'bank': {
            'title':'受理机构',
            'orgNo': '受理机构编号',
            'orgName': '受理机构名称',
        }
    }
}
