///<reference path="staff-manage/edit/allot-role.component.ts"/>
import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {SYSTEM_MANAGE_ROUTES} from "./system-manage.routes";
import {StaffManageListComponent} from "./staff-manage/staff-manage-list.component";
import {FunctionPowerListComponent} from "./function-power/function-power-list.component";
import {ParameterConfigListComponent} from "./parameter-config/parameter-config-list.component";
import {TimeTaskListComponent} from "app/bsmodules/system-manage/time-task-manage/time-task-list.component";
import {FieldListComponent} from "./field-manage/field-list.component";
import {ApplicationManageListComponent} from "./appliacation-manage/application-manage-list.component";
import {RoleAddBaseinfoComponent} from "./role-manage/addrole-component/role-add-baseinfo.component";
import {RoleAddFuncpermissionComponent} from "./role-manage/addrole-component/role-add-funcpermission.component";
import {RoleAddMenuComponent} from "./role-manage/addrole-component/role-add-rolemenupermission.component";
import {NzTreeModule} from "ng-tree-antd";
import {RolegorupManageListComponent} from "./rolegroup-manage/rolegorup-manage-list.component";
import {RoleManageComponent} from "./role-manage/role-manage-list.component";
import {RoleAddManageComponent} from "./role-manage/addrole-component/role-add-manage.component";
import {FunctionPowerEditComponent} from "./function-power/function-power-edit.component";
import {ParameterConfigEditComponent} from "./parameter-config/parameter-config-edit.component";
import {TimeTaskEditComponent} from "./time-task-manage/time-task-edit.component";
import {FieldEditWinComponent} from "./field-manage/win/field-edit-win.component";
import {FieldConfigListComponent} from "app/bsmodules/system-manage/field-manage/field-config-list.component";
import {ModulesManageComponent} from "./appliacation-manage/module-manage.component";
import {AppManageAddWinComponent} from "./appliacation-manage/application-manage-add-win.component";
import {AppAdminAddWinComponent} from "./appliacation-manage/application-admin-add-win.component";
import {FieldConfigeditComponent} from "./field-manage/edit/field-config-edit.component";
import {AddRolegroupManageComponent} from "./rolegroup-manage/add-rolegroup-manage/add-rolegroup-manage.component";
import {AddBaseinfoRolegroupManageComponent} from "./rolegroup-manage/add-rolegroup-manage/add-baseinfo-rolegroup-manage.component";
import {AddRolegroupMenuComponent} from "./rolegroup-manage/add-rolegroup-manage/add-rolegroup-menu.component";
import {AddRolegroupFuncpermissionComponent} from "./rolegroup-manage/add-rolegroup-manage/add-rolegroup-funcpermission.component";
import {AllotRoleComponent} from "./staff-manage/edit/allot-role.component";
import {staffModifyPwdComponent} from "app/bsmodules/system-manage/staff-manage/win/modify-pwd.component";
import {StaffManageEditComponent} from "./staff-manage/edit/staff-manage.component";
import {StaffEditComponent} from "./staff-manage/edit/staff-edit.component";

/**
 * 系统管理模块
 */
@NgModule({
    imports:[
        SharedModule,
        NzTreeModule,
        RouterModule.forChild(SYSTEM_MANAGE_ROUTES)
    ],
    declarations:[
        ApplicationManageListComponent,
        AppManageAddWinComponent,
        AppAdminAddWinComponent,
        ModulesManageComponent,
        StaffManageListComponent,
        StaffManageEditComponent,
        StaffEditComponent,
        AllotRoleComponent,
        staffModifyPwdComponent,
        FunctionPowerListComponent,
        FunctionPowerEditComponent,
        ParameterConfigListComponent,
        ParameterConfigEditComponent,
        TimeTaskListComponent,
        TimeTaskEditComponent,
        FieldListComponent,
        FieldConfigListComponent,
        FieldEditWinComponent,
        FieldConfigeditComponent,
        RoleManageComponent,
        RolegorupManageListComponent,
        RoleAddManageComponent,
        RoleAddBaseinfoComponent,
        RoleAddFuncpermissionComponent,
        RoleAddMenuComponent,
        AddRolegroupManageComponent,
        AddBaseinfoRolegroupManageComponent,
        AddRolegroupMenuComponent,
        AddRolegroupFuncpermissionComponent
    ],
    entryComponents: [
        staffModifyPwdComponent,
        StaffEditComponent,
        AllotRoleComponent,
        RoleAddBaseinfoComponent,
        RoleAddFuncpermissionComponent,
        RoleAddMenuComponent,
        RoleAddManageComponent,
        FieldEditWinComponent,
        AppManageAddWinComponent,
        AppAdminAddWinComponent,
        AddBaseinfoRolegroupManageComponent,
        AddRolegroupMenuComponent,
        AddRolegroupFuncpermissionComponent,


    ]
})
export class SystemManageModule{

}
