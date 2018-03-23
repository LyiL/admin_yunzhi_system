/**
 * Created by cty on 2018/3/1.
 * 参数配置语言包
 * @type {{parameter: {listPage: {title: string; search: {confName: string; keyCode: string; value: string; confType: string; moduleCode: string}}}}}
 */

export const PARAMENTER_CONFIG_LANG = {
    'parameter': {
        'listPage': {
            'title': '参数配置',
            'search': {
                'confName': '显示名称',
                'keyCode': '配置项编码',
                'moduleCode': '分组',
            },
            'tableCols': {
                'confName': '显示名称',
                'keyCode': '配置项编码',
                'value': '配置项值',
                'confType': '类型',
                'moduleCode': '分组',
            }
        },
        'editParameter': {
            'editTitle': '编辑参数配置',
            'addTitle': '新增参数配置',
            'keyCode': '配置项编码',
            'confName': '显示名称',
            'confType': '类型',
            'imgUpload': '图片上传',
            'moduleCode': '分组',
            'value': '值',
            'descript': '配置项说明',
            'isShow': '是否在页面显示',
            'hintTitle': '注意',
            'hintA': '1、类型为："select"时，必须填写[存储范围]字段，格式为：格式为："id":"111","name":"选择项一","id":"222","name":"选择项二","id":"333","name":"选择项三"',
            'hintB': '2、[配置项属性]字段是为 "POPUP","SELECT", "IMAGE"控件配置相关配置信息所用,配置参数请参照对应的系统控件',
            'hintC': '3、[分组]字段必须以功能取名',
            'hintD': '4、[配置项说明]字段是用来说明当前配置的说明，请写详细点，让客户能清晰配置用途',
        }
    }
}
