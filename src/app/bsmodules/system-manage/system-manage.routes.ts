import {StaffManageListComponent} from "./staff-manage/staff-manage-list.component";
import {FunctionPowerListComponent} from "./function-power/function-power-list.component";
import {ParameterConfigListComponent} from "./parameter-config/parameter-config-list.component";
import {TimeTaskListComponent} from "./time-task-manage/time-task-list.component";
import {FieldListComponent} from "./field-manage/field-list.component";
import {ApplicationManageListComponent} from "./appliacation-manage/application-manage-list.component";
import {ModulesManageComponent} from "./appliacation-manage/module-manage.component";
import {RoleManageComponent} from "./role-manage/role-manage-list.component";
import {RoleAddManageComponent} from "./role-manage/addrole-component/role-add-manage.component";
import {RolegorupManageListComponent} from "./rolegroup-manage/rolegorup-manage-list.component";
import {FunctionPowerEditComponent} from "./function-power/function-power-edit.component";
import {ParameterConfigEditComponent} from "./parameter-config/parameter-config-edit.component";
import {TimeTaskEditComponent} from "./time-task-manage/time-task-edit.component";
import {FieldConfigListComponent} from "./field-manage/field-config-list.component";
import {FieldConfigeditComponent} from "./field-manage/edit/field-config-edit.component";
import {AddRolegroupManageComponent} from "./rolegroup-manage/add-rolegroup-manage/add-rolegroup-manage.component";
import {StaffManageEditComponent} from "./staff-manage/edit/staff-manage.component";
/**
 * 系统管理路由
 * @type {Array}
 */
export const SYSTEM_MANAGE_ROUTES = [
    {path:'applicationlist', component:ApplicationManageListComponent},     // 应用管理
    {path: 'modulesmanage', component: ModulesManageComponent},             //模块管理
    {path: 'stafflist', component: StaffManageListComponent},               // 员工管理
    {path: 'staffedit', component: StaffManageEditComponent},               // 员工管理新增/编辑
    {path: 'functionpowerlist', component: FunctionPowerListComponent},     // 功能权限管理
    {path: 'functionpoweredit', component: FunctionPowerEditComponent},     // 功能权限管理新增/编辑
    {path: 'parameterlist', component: ParameterConfigListComponent},       // 参数配置
    {path: 'parameteredit', component: ParameterConfigEditComponent},       // 参数配置新增/编辑
    {path: 'timetasklist', component: TimeTaskListComponent},               // 定时任务
    {path: 'timetaskedit', component: TimeTaskEditComponent},               // 定时任务新增/编辑
    {path: 'fieldlist', component: FieldListComponent},                     // 领域管理列表
    {path: 'fieldconfiglist', component: FieldConfigListComponent},         // 领域配置列表
    {path: 'fieldconfigedit', component: FieldConfigeditComponent},         // 领域配置新增/编辑
    {path: 'rolemanagelist', component:RoleManageComponent},                //角色管理模块
    {path: 'roleaddmanage', component:RoleAddManageComponent},              //新增角色
    {path: 'rolegrouplist', component:RolegorupManageListComponent},        //角色组管理模块
    {path: 'addrolegrouplist', component:AddRolegroupManageComponent},        //新增角色组管理模块
];


