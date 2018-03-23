export class CommonEnum{
    /**
    * 初始化数据缓存key
    */
    public static INIT_DATA_SESSION_STORAGE_KEY = {
        SYSTEM_CFG:'system_config',
        DOMAIN_CFG:'domain_config',
        FUNCS:'funcs',
        TREES:'trees'
    };

    /**
    * 缓存key
    * @type {{USER_INFO: string}}
    */
    public static AUTH_SESSION_STORAGE_KEY = {
        USER_INFO:'user_info',
        LOGIN_REMEMBER:'remember',
        LOGIN_USERNAME:'userName',
        LOGIN_USERPWD:'userPwd'
    };

    /**
    * 查询条件缓存KEY
    * @type string
    */
    public static QUERY_PARAMS_STORAGE_KEY = 'query_params';

    /**
    * 服务器端返回的状态字段
    * @type {string}
    */
    public static SERVER_STATUS_KEY = 'status';

    /**
     * 服务器端返回的状态值
     * @type {number}
     */
    public static SERVER_STATUS_DATE_KEY = 200;

    /**
    * 服务器端返回的数据字段
    * @type {string}
    */
    public static SERVER_DATA_KEY = 'data';

    /**
    * 服务器端返回的消息字段
    * @type {string}
    */
    public static SERVER_MES_KEY = 'message';

    /**
    * 服务器返回的错误字段
    * @type {string}
    */
    public static SERVER_ERROR_KEY = 'error';
    /**
     * 表格返回数据字段
     */
    public static TABLE_RES_RE_NAME = {list:'data.innerData',total:'data.totalRows',pi:'data.currentPage',ps:'data.pageSize'};
    /**
     * 表格请求参数字段
     */
    public static TABLE_REQ_RE_NAME = {pi:'page',ps:'size'};
    /**
     * 表格返回数据字段，不分页模式
     */
    public static TABLE_NOT_PAGE_RES_RE_NAME = {list:'data'};
    /**
     * 锁屏回跳地址
     * @type {string}
     */
    public static LOCK_URL = "lock_url";
}
