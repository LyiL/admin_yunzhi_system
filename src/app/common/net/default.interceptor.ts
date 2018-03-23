import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler,
         HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
       } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map, mergeMap,catchError } from 'rxjs/operators';
import "rxjs/add/observable/timer";

import {CommonEnum} from "../enum/common.enum";
import {NzMessageService} from "ng-zorro-antd";
import {SettingsService,MenuService} from "@delon/theme";
import {ReuseTabService} from "@delon/abc";

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    private goLogin() {
        const router = this.injector.get(Router);
        this.reuseTabService().clear();
        this.injector.get(Router).navigate([ '/login' ]);
    }

    private msg():NzMessageService{
        return this.injector.get(NzMessageService);
    }

    private setting():SettingsService{
        return this.injector.get(SettingsService);
    }

    private menuSerivce():MenuService{
        return this.injector.get(MenuService);
    }

    private reuseTabService():ReuseTabService{
        return this.injector.get(ReuseTabService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        return next.handle(req).pipe(
                    mergeMap((event: any) => {
                        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                        if (event instanceof HttpResponse) {
                            let status = event.body && event.body.status;
                            if ((''+status).startsWith('6')) {
                                let m = status == 600 ? '验证失败' : (status == 601 ? '用户身份验证失败':'用户未经授权');
                                this.msg().info(m);
                                Observable.timer(2200).subscribe({
                                    complete:(function(){
                                        let keys:Array<any> = [];
                                        for(let i=0,key = undefined; i<sessionStorage.length; i++){
                                            key = sessionStorage.key(i);
                                            if((key != CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.DOMAIN_CFG && key != CommonEnum.INIT_DATA_SESSION_STORAGE_KEY.SYSTEM_CFG)){
                                                keys.push(key);
                                            }
                                        }
                                        keys.forEach((key)=>{
                                            sessionStorage.removeItem(key);
                                        });
                                        this.setting().setUser(null);
                                        this.menuSerivce().clear();
                                        this.goLogin();
                                    }).bind(this)
                                });
                            }
                        }
                        // 若一切都正常，则后续操作
                        return Observable.create(observer => observer.next(event));
                    }),
                    catchError((res: HttpResponse<any>) => {
                        // 业务处理：一些通用操作
                        switch (res.status) {
                            case 401: // 未登录状态码
                                this.goLogin();
                                break;
                            case 200:
                                // 业务层级错误处理
                                // console.log('业务错误');
                                break;
                            case 404:
                                // 404
                                break;
                        }
                        // 以错误的形式结束本次请求
                        return ErrorObservable.create(event);
                    })
                );
    }
}
