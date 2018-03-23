import {BaseModel} from "../base.model";

/**
 * 公众号授权二维码上传表单字段模板
 * Created by hux on 2018/3/5
 */
export class WxPublicAuthUploadModel extends BaseModel{
    public id:number; // 主键id
    public followCode:string; // 关注二维码

    constructor() {
        super();
    }
}
