import {BaseModel} from '../../base.model';

/**
 * 添加管理员账号
 * Created by lyl on 2018/3/1
 */
export class AppAdminModel extends BaseModel{
    public id: string;     //id主键，编辑时必传
    public appId: string;    //应用ID
    public realName: string; //真实姓名
    public userName: string; //用户名
    public userPwd: string; // 用户密码
    public confirmPass: string; //确认密码
}
