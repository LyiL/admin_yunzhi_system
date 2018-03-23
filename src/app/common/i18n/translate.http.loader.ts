import {TranslateLoader} from "@ngx-translate/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
/**
 * 实现按功能加载语言文件
 */
export class CostomTranslateHttpLoader implements TranslateLoader{
    constructor(private langs:any={}){}

    getTranslation(lang: string): Observable<any> {
        let langRes:any = {};
        const langs = this.langs[lang];
        langs && langs.forEach((_lang)=>{
            Object['assign'](langRes,_lang);
        });
        return Observable.of(langRes);
    }

}
