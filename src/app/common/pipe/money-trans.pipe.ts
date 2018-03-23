import {PipeTransform, Pipe, LOCALE_ID, Inject, Optional} from "@angular/core";
import {HelperService} from "../services/helper.service";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
/**
 * 金额分转元，转换管道
 */
@Pipe({
    name:'moneySpunYuanTrans'
})
export class MoneyTransPipe extends DecimalPipe implements PipeTransform{

    transform(value: any = 0, digits?: string, locale?: string): any {
        if(value !== 0){
            value = (value * 1000) / 1000 / 100;
        }
        return super.transform(value,digits,locale);
    }

}
