import * as moment from 'moment';
export class BaseModel{
    /**
     * 时间格式化
     * @param val 值
     * @param format 格式，默认格式为 YYYY-MM-DD HH:mm:ss
     * @returns {string}
     */
    format(val:any,format:string='YYYY-MM-DD HH:mm:ss'){
        return moment(val).format(format);
    }

    /**
     * 默认时间
     * @param format 格式，默认格式为 YYYY-MM-DD HH:mm:ss
     * @returns {string}
     */
    defTime(day?:any,format:string='YYYY-MM-DD HH:mm:ss'){
        let _moment = moment();
        if(day){
            if(typeof day == 'number'){
                _moment.add(day,'days');
            }else if(typeof day == 'string'){
                format = day;
            }
        }
        return _moment.format(format);
    }

    /**
     * 调整时间
     * @param date 需要调整的时间
     * @param day 调整天数
     * @param {string} format 格式，默认：'YYYY-MM-DD HH:mm:ss'
     * @returns {string}
     */
    modifyDate(date:any,day?:any,format:string='YYYY-MM-DD HH:mm:ss'){
        let _moment = moment(date);
        if(day){
            if(typeof day == 'number'){
                _moment.add(day,'days');
            }
        }
        return _moment.format(format);
    }

    isEmpty(value:any){
        return value == null || value === '' || value !== value;
    }
}
