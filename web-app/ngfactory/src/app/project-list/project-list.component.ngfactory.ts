/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/render/api';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from '../../../../src/app/project-list/project-list.component';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from '../../../../src/app/services/GlobalService';
import * as import9 from '../../../../src/app/services/ProjectService';
import * as import10 from '@angular/router/src/router';
import * as import11 from '@angular/core/src/metadata/view';
import * as import12 from '@angular/core/src/linker/component_factory';
import * as import13 from '@angular/common/src/directives/ng_if';
import * as import14 from '@angular/core/src/linker/template_ref';
import * as import15 from '@angular/common/src/directives/ng_for';
import * as import16 from '@angular/core/src/change_detection/differs/iterable_differs';
var renderType_ProjectListComponent_Host:import0.RenderComponentType = (null as any);
class _View_ProjectListComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import2.AppElement;
  _ProjectListComponent_0_4:import3.ProjectListComponent;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent_Host0,renderType_ProjectListComponent_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.selectOrCreateHostElement('project-list',rootSelector,(null as any));
    this._appEl_0 = new import2.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_ProjectListComponent0(this.viewUtils,this.injector(0),this._appEl_0);
    this._ProjectListComponent_0_4 = new import3.ProjectListComponent(this.parentInjector.get(import8.GlobalService),this.parentInjector.get(import9.ProjectService),this.parentInjector.get(import10.Router));
    this._appEl_0.initComponent(this._ProjectListComponent_0_4,[],compView_0);
    compView_0.create(this._ProjectListComponent_0_4,this.projectableNodes,(null as any));
    this.init([].concat([this._el_0]),[this._el_0],[],[]);
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import3.ProjectListComponent) && (0 === requestNodeIndex))) { return this._ProjectListComponent_0_4; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._ProjectListComponent_0_4.ngOnInit(); }
    this.detectContentChildrenChanges(throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_ProjectListComponent_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  if ((renderType_ProjectListComponent_Host === (null as any))) { (renderType_ProjectListComponent_Host = viewUtils.createRenderComponentType('',0,import11.ViewEncapsulation.None,[],{})); }
  return new _View_ProjectListComponent_Host0(viewUtils,parentInjector,declarationEl);
}
export const ProjectListComponentNgFactory:import12.ComponentFactory<import3.ProjectListComponent> = new import12.ComponentFactory<import3.ProjectListComponent>('project-list',viewFactory_ProjectListComponent_Host0,import3.ProjectListComponent);
const styles_ProjectListComponent:any[] = [];
var renderType_ProjectListComponent:import0.RenderComponentType = (null as any);
class _View_ProjectListComponent0 extends import1.AppView<import3.ProjectListComponent> {
  _el_0:any;
  _text_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _text_15:any;
  _text_16:any;
  _text_17:any;
  _text_18:any;
  _anchor_19:any;
  /*private*/ _appEl_19:import2.AppElement;
  _TemplateRef_19_5:any;
  _NgIf_19_6:import13.NgIf;
  _text_20:any;
  _anchor_21:any;
  /*private*/ _appEl_21:import2.AppElement;
  _TemplateRef_21_5:any;
  _NgIf_21_6:import13.NgIf;
  _text_22:any;
  _anchor_23:any;
  /*private*/ _appEl_23:import2.AppElement;
  _TemplateRef_23_5:any;
  _NgIf_23_6:import13.NgIf;
  _text_24:any;
  _anchor_25:any;
  /*private*/ _appEl_25:import2.AppElement;
  _TemplateRef_25_5:any;
  _NgIf_25_6:import13.NgIf;
  _text_26:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent0,renderType_ProjectListComponent,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._el_0 = this.renderer.createElement(parentRenderNode,'div',(null as any));
    this.renderer.setElementAttribute(this._el_0,'class','project-index');
    this._text_1 = this.renderer.createText(this._el_0,'\n\n	',(null as any));
    this._text_2 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this._el_3 = this.renderer.createElement(this._el_0,'div',(null as any));
    this.renderer.setElementAttribute(this._el_3,'class','panel panel-default hiddenContent');
    this.renderer.setElementAttribute(this._el_3,'id','options-container');
    this._text_4 = this.renderer.createText(this._el_3,'\n		',(null as any));
    this._el_5 = this.renderer.createElement(this._el_3,'div',(null as any));
    this.renderer.setElementAttribute(this._el_5,'class','panel-body');
    this._text_6 = this.renderer.createText(this._el_5,'\n			',(null as any));
    this._el_7 = this.renderer.createElement(this._el_5,'h3',(null as any));
    this.renderer.setElementAttribute(this._el_7,'class','options-container-title');
    this._text_8 = this.renderer.createText(this._el_7,'Project List',(null as any));
    this._text_9 = this.renderer.createText(this._el_5,'\n			',(null as any));
    this._el_10 = this.renderer.createElement(this._el_5,'button',(null as any));
    this.renderer.setElementAttribute(this._el_10,'class','btn btn-primary');
    this.renderer.setElementAttribute(this._el_10,'type','button');
    this._text_11 = this.renderer.createText(this._el_10,'Refresh',(null as any));
    this._text_12 = this.renderer.createText(this._el_5,'\n			',(null as any));
    this._el_13 = this.renderer.createElement(this._el_5,'button',(null as any));
    this.renderer.setElementAttribute(this._el_13,'class','btn btn-default');
    this.renderer.setElementAttribute(this._el_13,'type','button');
    this._text_14 = this.renderer.createText(this._el_13,'Back',(null as any));
    this._text_15 = this.renderer.createText(this._el_5,'\n		',(null as any));
    this._text_16 = this.renderer.createText(this._el_3,'\n	',(null as any));
    this._text_17 = this.renderer.createText(this._el_0,'\n\n	',(null as any));
    this._text_18 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this._anchor_19 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._appEl_19 = new import2.AppElement(19,0,this,this._anchor_19);
    this._TemplateRef_19_5 = new import14.TemplateRef_(this._appEl_19,viewFactory_ProjectListComponent1);
    this._NgIf_19_6 = new import13.NgIf(this._appEl_19.vcRef,this._TemplateRef_19_5);
    this._text_20 = this.renderer.createText(this._el_0,'\n\n	',(null as any));
    this._anchor_21 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._appEl_21 = new import2.AppElement(21,0,this,this._anchor_21);
    this._TemplateRef_21_5 = new import14.TemplateRef_(this._appEl_21,viewFactory_ProjectListComponent3);
    this._NgIf_21_6 = new import13.NgIf(this._appEl_21.vcRef,this._TemplateRef_21_5);
    this._text_22 = this.renderer.createText(this._el_0,'\n\n	',(null as any));
    this._anchor_23 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._appEl_23 = new import2.AppElement(23,0,this,this._anchor_23);
    this._TemplateRef_23_5 = new import14.TemplateRef_(this._appEl_23,viewFactory_ProjectListComponent4);
    this._NgIf_23_6 = new import13.NgIf(this._appEl_23.vcRef,this._TemplateRef_23_5);
    this._text_24 = this.renderer.createText(this._el_0,'\n\n	',(null as any));
    this._anchor_25 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._appEl_25 = new import2.AppElement(25,0,this,this._anchor_25);
    this._TemplateRef_25_5 = new import14.TemplateRef_(this._appEl_25,viewFactory_ProjectListComponent5);
    this._NgIf_25_6 = new import13.NgIf(this._appEl_25.vcRef,this._TemplateRef_25_5);
    this._text_26 = this.renderer.createText(this._el_0,'\n\n',(null as any));
    var disposable_0:Function = this.renderer.listen(this._el_10,'click',this.eventHandler(this._handle_click_10_0.bind(this)));
    var disposable_1:Function = this.renderer.listen(this._el_13,'click',this.eventHandler(this._handle_click_13_0.bind(this)));
    this._expr_2 = import7.UNINITIALIZED;
    this._expr_3 = import7.UNINITIALIZED;
    this._expr_4 = import7.UNINITIALIZED;
    this._expr_5 = import7.UNINITIALIZED;
    this.init([],[
      this._el_0,
      this._text_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._text_9,
      this._el_10,
      this._text_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._text_15,
      this._text_16,
      this._text_17,
      this._text_18,
      this._anchor_19,
      this._text_20,
      this._anchor_21,
      this._text_22,
      this._anchor_23,
      this._text_24,
      this._anchor_25,
      this._text_26
    ]
    ,[
      disposable_0,
      disposable_1
    ]
    ,[]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import14.TemplateRef) && (19 === requestNodeIndex))) { return this._TemplateRef_19_5; }
    if (((token === import13.NgIf) && (19 === requestNodeIndex))) { return this._NgIf_19_6; }
    if (((token === import14.TemplateRef) && (21 === requestNodeIndex))) { return this._TemplateRef_21_5; }
    if (((token === import13.NgIf) && (21 === requestNodeIndex))) { return this._NgIf_21_6; }
    if (((token === import14.TemplateRef) && (23 === requestNodeIndex))) { return this._TemplateRef_23_5; }
    if (((token === import13.NgIf) && (23 === requestNodeIndex))) { return this._NgIf_23_6; }
    if (((token === import14.TemplateRef) && (25 === requestNodeIndex))) { return this._TemplateRef_25_5; }
    if (((token === import13.NgIf) && (25 === requestNodeIndex))) { return this._NgIf_25_6; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_2:any = this.context.showList;
    if (import4.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this._NgIf_19_6.ngIf = currVal_2;
      this._expr_2 = currVal_2;
    }
    const currVal_3:any = this.context.showEmptyList;
    if (import4.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this._NgIf_21_6.ngIf = currVal_3;
      this._expr_3 = currVal_3;
    }
    const currVal_4:any = this.context.showError;
    if (import4.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this._NgIf_23_6.ngIf = currVal_4;
      this._expr_4 = currVal_4;
    }
    const currVal_5:any = this.context.showLoading;
    if (import4.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this._NgIf_25_6.ngIf = currVal_5;
      this._expr_5 = currVal_5;
    }
    this.detectContentChildrenChanges(throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
  private _handle_click_10_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.load()) !== false);
    return (true && pd_0);
  }
  private _handle_click_13_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.back()) !== false);
    return (true && pd_0);
  }
}
export function viewFactory_ProjectListComponent0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<import3.ProjectListComponent> {
  if ((renderType_ProjectListComponent === (null as any))) { (renderType_ProjectListComponent = viewUtils.createRenderComponentType('/Users/paulo/Documents/workspaces/go/src/github.com/prsolucoes/goci/web-app/src/app/project-list/project-list.component.html',0,import11.ViewEncapsulation.None,styles_ProjectListComponent,{})); }
  return new _View_ProjectListComponent0(viewUtils,parentInjector,declarationEl);
}
class _View_ProjectListComponent1 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _anchor_4:any;
  /*private*/ _appEl_4:import2.AppElement;
  _TemplateRef_4_5:any;
  _NgFor_4_6:import15.NgFor;
  _text_5:any;
  _text_6:any;
  /*private*/ _expr_0:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent1,renderType_ProjectListComponent,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'div',(null as any));
    this.renderer.setElementAttribute(this._el_0,'id','data');
    this._text_1 = this.renderer.createText(this._el_0,'\n		',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'div',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','list-group');
    this.renderer.setElementAttribute(this._el_2,'id','project-list');
    this._text_3 = this.renderer.createText(this._el_2,'\n			',(null as any));
    this._anchor_4 = this.renderer.createTemplateAnchor(this._el_2,(null as any));
    this._appEl_4 = new import2.AppElement(4,2,this,this._anchor_4);
    this._TemplateRef_4_5 = new import14.TemplateRef_(this._appEl_4,viewFactory_ProjectListComponent2);
    this._NgFor_4_6 = new import15.NgFor(this._appEl_4.vcRef,this._TemplateRef_4_5,this.parent.parentInjector.get(import16.IterableDiffers),this.parent.ref);
    this._text_5 = this.renderer.createText(this._el_2,'\n		',(null as any));
    this._text_6 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this._expr_0 = import7.UNINITIALIZED;
    this.init([].concat([this._el_0]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._anchor_4,
      this._text_5,
      this._text_6
    ]
    ,[],[]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import14.TemplateRef) && (4 === requestNodeIndex))) { return this._TemplateRef_4_5; }
    if (((token === import15.NgFor) && (4 === requestNodeIndex))) { return this._NgFor_4_6; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    var changes:{[key: string]:import7.SimpleChange} = (null as any);
    changes = (null as any);
    const currVal_0:any = this.parent.context.projectList;
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this._NgFor_4_6.ngForOf = currVal_0;
      if ((changes === (null as any))) { (changes = {}); }
      changes['ngForOf'] = new import7.SimpleChange(this._expr_0,currVal_0);
      this._expr_0 = currVal_0;
    }
    if ((changes !== (null as any))) { this._NgFor_4_6.ngOnChanges(changes); }
    if (!throwOnChange) { this._NgFor_4_6.ngDoCheck(); }
    this.detectContentChildrenChanges(throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_ProjectListComponent1(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_ProjectListComponent1(viewUtils,parentInjector,declarationEl);
}
class _View_ProjectListComponent2 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent2,renderType_ProjectListComponent,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'a',(null as any));
    this.renderer.setElementAttribute(this._el_0,'class','project-row list-group-item');
    this.renderer.setElementAttribute(this._el_0,'href','javascript: void(0);');
    this._text_1 = this.renderer.createText(this._el_0,'\n				',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'h4',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','list-group-item-heading');
    this._text_3 = this.renderer.createText(this._el_2,'',(null as any));
    this._text_4 = this.renderer.createText(this._el_0,'\n				',(null as any));
    this._el_5 = this.renderer.createElement(this._el_0,'p',(null as any));
    this.renderer.setElementAttribute(this._el_5,'class','list-group-item-text');
    this._text_6 = this.renderer.createText(this._el_5,'',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n			',(null as any));
    var disposable_0:Function = this.renderer.listen(this._el_0,'click',this.eventHandler(this._handle_click_0_0.bind(this)));
    this._expr_1 = import7.UNINITIALIZED;
    this._expr_2 = import7.UNINITIALIZED;
    this.init([].concat([this._el_0]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7
    ]
    ,[disposable_0],[]);
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this.detectContentChildrenChanges(throwOnChange);
    const currVal_1:any = import4.interpolate(1,'',this.context.$implicit.name,'');
    if (import4.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setText(this._text_3,currVal_1);
      this._expr_1 = currVal_1;
    }
    const currVal_2:any = import4.interpolate(1,'',this.context.$implicit.description,'');
    if (import4.checkBinding(throwOnChange,this._expr_2,currVal_2)) {
      this.renderer.setText(this._text_6,currVal_2);
      this._expr_2 = currVal_2;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
  private _handle_click_0_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.parent.parent.context.view(this.context.$implicit.id)) !== false);
    return (true && pd_0);
  }
}
function viewFactory_ProjectListComponent2(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_ProjectListComponent2(viewUtils,parentInjector,declarationEl);
}
class _View_ProjectListComponent3 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _text_9:any;
  _text_10:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent3,renderType_ProjectListComponent,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'div',(null as any));
    this.renderer.setElementAttribute(this._el_0,'id','no-data');
    this._text_1 = this.renderer.createText(this._el_0,'\n		',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'div',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','panel panel-default');
    this._text_3 = this.renderer.createText(this._el_2,'\n			',(null as any));
    this._el_4 = this.renderer.createElement(this._el_2,'div',(null as any));
    this.renderer.setElementAttribute(this._el_4,'class','panel-body');
    this._text_5 = this.renderer.createText(this._el_4,'\n				',(null as any));
    this._el_6 = this.renderer.createElement(this._el_4,'div',(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'No projects found',(null as any));
    this._text_8 = this.renderer.createText(this._el_4,'\n			',(null as any));
    this._text_9 = this.renderer.createText(this._el_2,'\n		',(null as any));
    this._text_10 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this.init([].concat([this._el_0]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._text_9,
      this._text_10
    ]
    ,[],[]);
    return (null as any);
  }
}
function viewFactory_ProjectListComponent3(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_ProjectListComponent3(viewUtils,parentInjector,declarationEl);
}
class _View_ProjectListComponent4 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _text_15:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent4,renderType_ProjectListComponent,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'div',(null as any));
    this.renderer.setElementAttribute(this._el_0,'id','error-data');
    this._text_1 = this.renderer.createText(this._el_0,'\n		',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'div',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','panel panel-default');
    this._text_3 = this.renderer.createText(this._el_2,'\n			',(null as any));
    this._el_4 = this.renderer.createElement(this._el_2,'div',(null as any));
    this.renderer.setElementAttribute(this._el_4,'class','panel-body');
    this._text_5 = this.renderer.createText(this._el_4,'\n				',(null as any));
    this._el_6 = this.renderer.createElement(this._el_4,'h3',(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'Problem while loading project list',(null as any));
    this._text_8 = this.renderer.createText(this._el_4,'\n				',(null as any));
    this._el_9 = this.renderer.createElement(this._el_4,'p',(null as any));
    this.renderer.setElementAttribute(this._el_9,'id','error-data-message');
    this._text_10 = this.renderer.createText(this._el_4,'\n				',(null as any));
    this._el_11 = this.renderer.createElement(this._el_4,'button',(null as any));
    this.renderer.setElementAttribute(this._el_11,'class','btn btn-primary');
    this.renderer.setElementAttribute(this._el_11,'type','button');
    this._text_12 = this.renderer.createText(this._el_11,'Try again',(null as any));
    this._text_13 = this.renderer.createText(this._el_4,'\n			',(null as any));
    this._text_14 = this.renderer.createText(this._el_2,'\n		',(null as any));
    this._text_15 = this.renderer.createText(this._el_0,'\n	',(null as any));
    var disposable_0:Function = this.renderer.listen(this._el_11,'click',this.eventHandler(this._handle_click_11_0.bind(this)));
    this.init([].concat([this._el_0]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._text_13,
      this._text_14,
      this._text_15
    ]
    ,[disposable_0],[]);
    return (null as any);
  }
  private _handle_click_11_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.parent.context.load()) !== false);
    return (true && pd_0);
  }
}
function viewFactory_ProjectListComponent4(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_ProjectListComponent4(viewUtils,parentInjector,declarationEl);
}
class _View_ProjectListComponent5 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _text_5:any;
  _text_6:any;
  _text_7:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_ProjectListComponent5,renderType_ProjectListComponent,import6.ViewType.EMBEDDED,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.renderer.createElement((null as any),'div',(null as any));
    this.renderer.setElementAttribute(this._el_0,'id','loading-data');
    this._text_1 = this.renderer.createText(this._el_0,'\n		',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'div',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','panel panel-default');
    this._text_3 = this.renderer.createText(this._el_2,'\n			',(null as any));
    this._el_4 = this.renderer.createElement(this._el_2,'div',(null as any));
    this.renderer.setElementAttribute(this._el_4,'class','panel-body');
    this._text_5 = this.renderer.createText(this._el_4,'Loading...',(null as any));
    this._text_6 = this.renderer.createText(this._el_2,'\n		',(null as any));
    this._text_7 = this.renderer.createText(this._el_0,'\n	',(null as any));
    this.init([].concat([this._el_0]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6,
      this._text_7
    ]
    ,[],[]);
    return (null as any);
  }
}
function viewFactory_ProjectListComponent5(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  return new _View_ProjectListComponent5(viewUtils,parentInjector,declarationEl);
}