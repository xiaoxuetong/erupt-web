import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
// delon
import {AlainThemeModule} from "@delon/theme";
import {DelonABCModule} from "@delon/abc";
// #region third libs
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SafeUrlPipe} from "@shared/pipe/safe-url.pipe";
import {DataService} from "@shared/service/data.service";
import {UtilsService} from "@shared/service/utils.service";
import {RipperDirective} from './directive/ripper.directive';
import {EruptPageHeaderComponent} from "@shared/component/erupt-page-header.component";

const THIRD_MODULES = [
    NgZorroAntdModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [SafeUrlPipe, EruptPageHeaderComponent];
const DIRECTIVES = [];

// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonABCModule,
        // third libs
        ...THIRD_MODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        RipperDirective
    ],
    providers: [
        DataService
    ],
    entryComponents: [],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        // third libs
        ...THIRD_MODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        RipperDirective
    ]
})
export class SharedModule {
}
