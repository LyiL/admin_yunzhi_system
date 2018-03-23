import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 联行号管理数据源
 *  Created by zll on 2018/3/5
 */
@Injectable()
export class BankNumManageServic {
    constructor(private http:HttpService){
    }

    /**
     * 联行号管理列表查询地址
     *
     *  String  cardBin     银行卡号标识
        String  fullName        银行全称
     */
    public static BANKNUM_LIST_URL = '/paymentbankcardbin/searchforpage';


    /**
     * 新增联行号信息
     *
     * String  cardBin     银行卡号标识
     Integer     cardLeg     卡号长度
     String  orgBankno   银行编号
     String  smallName   银行简称
     String  fullName        银行全称
     String  bankLinkno  银联号
     */
    addBankNumInfo(params): Observable<any> {
        return this.http.post('/paymentbankcardbin/save', params);
    }

    /**
     *编辑联行号信息
     * Long    id          主键ID
     String  cardBin     银行卡号标识
     Integer     cardLeg     卡号长度
     String  orgBankno   银行编号
     String  smallName   银行简称
     String  fullName        银行全称
     String  bankLinkno  银联号
     */
    editBankNumInfo(data): Observable<any> {
        return this.http.post('/paymentbankcardbin/edit', data);
    }

    /**
     * 查询联行号的详情
     * Long    id          主键ID
     */
   detailBankNumInfo(data): Observable<any> {
        return this.http.post('/paymentbankcardbin/findbykey', data);
    }
}



