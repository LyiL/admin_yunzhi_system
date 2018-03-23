import {PipeTransform, Pipe} from "@angular/core";
import {HelperService} from "../services/helper.service";
@Pipe({
    name:'dictTrans'
})
export class DictTransPipe implements PipeTransform{

    constructor(private helper:HelperService){}

    transform(value: any, key: any,locationValue:Array<number> = []): any {
        if(locationValue.length > 0){
            value = value.substring(locationValue[0],locationValue[1]);
        }
        return this.helper.dictTrans(key,value);
    }

}
