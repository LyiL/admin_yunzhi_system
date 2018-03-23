import {PipeTransform, Pipe} from "@angular/core";
import {HelperService} from "../services/helper.service";
/**
 * 数值转换管道
 */
@Pipe({
    name:'numberRate'
})
export class NumberRatePipe implements PipeTransform{

    constructor(private helper:HelperService){}

    /**
     * 转译方法
     * @param value 转译值
     * @param isRate 转译类型，multiplication：乘法，division：除法，original：原始，默认 multiplication
     * @param rate 转译大小，默认 1000
     * @returns {any}
     */
    transform(value: any,isRate:'multiplication'|'division'|'original' = 'multiplication',rate:number = 1000): any {
        return this.helper.numberTrans(value,isRate,rate);
    }

}
