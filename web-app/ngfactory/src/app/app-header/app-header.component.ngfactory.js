/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var import1 = require('@angular/core/src/linker/view');
var import2 = require('@angular/core/src/linker/element');
var import3 = require('../../../../src/app/app-header/app-header.component');
var import4 = require('@angular/core/src/linker/view_utils');
var import6 = require('@angular/core/src/linker/view_type');
var import7 = require('@angular/core/src/change_detection/change_detection');
var import8 = require('../../../../src/app/services/GlobalService');
var import9 = require('@angular/core/src/metadata/view');
var import10 = require('@angular/core/src/linker/component_factory');
var import11 = require('./app-header.component.css.shim');
var import12 = require('@angular/router/src/directives/router_link');
var import13 = require('@angular/router/src/router');
var import14 = require('@angular/router/src/router_state');
var import15 = require('@angular/common/src/location/location_strategy');
var import16 = require('@angular/core/src/security');
var renderType_AppHeaderComponent_Host = null;
var _View_AppHeaderComponent_Host0 = (function (_super) {
    __extends(_View_AppHeaderComponent_Host0, _super);
    function _View_AppHeaderComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_AppHeaderComponent_Host0, renderType_AppHeaderComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_AppHeaderComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.selectOrCreateHostElement('app-header', rootSelector, null);
        this._appEl_0 = new import2.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_AppHeaderComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._AppHeaderComponent_0_4 = new import3.AppHeaderComponent(this.parentInjector.get(import8.GlobalService));
        this._appEl_0.initComponent(this._AppHeaderComponent_0_4, [], compView_0);
        compView_0.create(this._AppHeaderComponent_0_4, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_AppHeaderComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import3.AppHeaderComponent) && (0 === requestNodeIndex))) {
            return this._AppHeaderComponent_0_4;
        }
        return notFoundResult;
    };
    return _View_AppHeaderComponent_Host0;
}(import1.AppView));
function viewFactory_AppHeaderComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_AppHeaderComponent_Host === null)) {
        (renderType_AppHeaderComponent_Host = viewUtils.createRenderComponentType('', 0, import9.ViewEncapsulation.None, [], {}));
    }
    return new _View_AppHeaderComponent_Host0(viewUtils, parentInjector, declarationEl);
}
exports.AppHeaderComponentNgFactory = new import10.ComponentFactory('app-header', viewFactory_AppHeaderComponent_Host0, import3.AppHeaderComponent);
var styles_AppHeaderComponent = [import11.styles];
var renderType_AppHeaderComponent = null;
var _View_AppHeaderComponent0 = (function (_super) {
    __extends(_View_AppHeaderComponent0, _super);
    function _View_AppHeaderComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_AppHeaderComponent0, renderType_AppHeaderComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_AppHeaderComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._el_0 = this.renderer.createElement(parentRenderNode, 'nav', null);
        this.renderer.setElementAttribute(this._el_0, 'class', 'navbar navbar-default navbar-fixed-top');
        this._text_1 = this.renderer.createText(this._el_0, '\n	', null);
        this._el_2 = this.renderer.createElement(this._el_0, 'div', null);
        this.renderer.setElementAttribute(this._el_2, 'class', 'container-fluid');
        this._text_3 = this.renderer.createText(this._el_2, '\n		', null);
        this._el_4 = this.renderer.createElement(this._el_2, 'div', null);
        this.renderer.setElementAttribute(this._el_4, 'class', 'navbar-header');
        this._text_5 = this.renderer.createText(this._el_4, '\n			', null);
        this._el_6 = this.renderer.createElement(this._el_4, 'button', null);
        this.renderer.setElementAttribute(this._el_6, 'aria-controls', 'navbar');
        this.renderer.setElementAttribute(this._el_6, 'aria-expanded', 'false');
        this.renderer.setElementAttribute(this._el_6, 'class', 'navbar-toggle collapsed');
        this.renderer.setElementAttribute(this._el_6, 'data-target', '#nav-collapse');
        this.renderer.setElementAttribute(this._el_6, 'data-toggle', 'collapse');
        this.renderer.setElementAttribute(this._el_6, 'type', 'button');
        this._text_7 = this.renderer.createText(this._el_6, '\n				', null);
        this._el_8 = this.renderer.createElement(this._el_6, 'span', null);
        this.renderer.setElementAttribute(this._el_8, 'class', 'sr-only');
        this._text_9 = this.renderer.createText(this._el_8, 'Toggle navigation', null);
        this._text_10 = this.renderer.createText(this._el_6, '\n				', null);
        this._el_11 = this.renderer.createElement(this._el_6, 'span', null);
        this.renderer.setElementAttribute(this._el_11, 'class', 'icon-bar');
        this._text_12 = this.renderer.createText(this._el_6, '\n				', null);
        this._el_13 = this.renderer.createElement(this._el_6, 'span', null);
        this.renderer.setElementAttribute(this._el_13, 'class', 'icon-bar');
        this._text_14 = this.renderer.createText(this._el_6, '\n				', null);
        this._el_15 = this.renderer.createElement(this._el_6, 'span', null);
        this.renderer.setElementAttribute(this._el_15, 'class', 'icon-bar');
        this._text_16 = this.renderer.createText(this._el_6, '\n			', null);
        this._text_17 = this.renderer.createText(this._el_4, '\n			', null);
        this._el_18 = this.renderer.createElement(this._el_4, 'a', null);
        this.renderer.setElementAttribute(this._el_18, 'class', 'navbar-brand');
        this.renderer.setElementAttribute(this._el_18, 'href', 'javascript: void(0);');
        this.renderer.setElementAttribute(this._el_18, 'routerLink', '/home');
        this._RouterLinkWithHref_18_3 = new import12.RouterLinkWithHref(this.parentInjector.get(import13.Router), this.parentInjector.get(import14.ActivatedRoute), this.parentInjector.get(import15.LocationStrategy));
        this._text_19 = this.renderer.createText(this._el_18, '\n				', null);
        this._el_20 = this.renderer.createElement(this._el_18, 'img', null);
        this.renderer.setElementAttribute(this._el_20, 'alt', '');
        this.renderer.setElementAttribute(this._el_20, 'border', '0');
        this.renderer.setElementAttribute(this._el_20, 'class', 'logo pull-left');
        this.renderer.setElementAttribute(this._el_20, 'src', '../../static/images/logo-header.png');
        this._text_21 = this.renderer.createText(this._el_18, '\n				GoCI\n			', null);
        this._text_22 = this.renderer.createText(this._el_4, '\n		', null);
        this._text_23 = this.renderer.createText(this._el_2, '\n		', null);
        this._el_24 = this.renderer.createElement(this._el_2, 'div', null);
        this.renderer.setElementAttribute(this._el_24, 'class', 'collapse navbar-collapse');
        this.renderer.setElementAttribute(this._el_24, 'id', 'nav-collapse');
        this._text_25 = this.renderer.createText(this._el_24, '\n\n			', null);
        this._el_26 = this.renderer.createElement(this._el_24, 'ul', null);
        this.renderer.setElementAttribute(this._el_26, 'class', 'nav navbar-nav navbar-right');
        this._text_27 = this.renderer.createText(this._el_26, '\n				', null);
        this._el_28 = this.renderer.createElement(this._el_26, 'li', null);
        this._text_29 = this.renderer.createText(this._el_28, '\n					', null);
        this._el_30 = this.renderer.createElement(this._el_28, 'a', null);
        this.renderer.setElementAttribute(this._el_30, 'href', 'javascript: void(0);');
        this.renderer.setElementAttribute(this._el_30, 'routerLink', '/job/list');
        this._RouterLinkWithHref_30_3 = new import12.RouterLinkWithHref(this.parentInjector.get(import13.Router), this.parentInjector.get(import14.ActivatedRoute), this.parentInjector.get(import15.LocationStrategy));
        this._text_31 = this.renderer.createText(this._el_30, '\n						', null);
        this._el_32 = this.renderer.createElement(this._el_30, 'span', null);
        this.renderer.setElementAttribute(this._el_32, 'class', 'ph-job-running-list-count');
        this._text_33 = this.renderer.createText(this._el_32, '', null);
        this._text_34 = this.renderer.createText(this._el_30, '\n						', null);
        this._el_35 = this.renderer.createElement(this._el_30, 'span', null);
        this.renderer.setElementAttribute(this._el_35, 'class', 'ph-job-running-list-text');
        this._text_36 = this.renderer.createText(this._el_35, 'jobs', null);
        this._text_37 = this.renderer.createText(this._el_30, '\n					', null);
        this._text_38 = this.renderer.createText(this._el_28, '\n				', null);
        this._text_39 = this.renderer.createText(this._el_26, '\n				', null);
        this._el_40 = this.renderer.createElement(this._el_26, 'li', null);
        this._text_41 = this.renderer.createText(this._el_40, '\n					', null);
        this._el_42 = this.renderer.createElement(this._el_40, 'a', null);
        this.renderer.setElementAttribute(this._el_42, 'href', 'javascript: void(0);');
        this.renderer.setElementAttribute(this._el_42, 'routerLink', '/home');
        this._RouterLinkWithHref_42_3 = new import12.RouterLinkWithHref(this.parentInjector.get(import13.Router), this.parentInjector.get(import14.ActivatedRoute), this.parentInjector.get(import15.LocationStrategy));
        this._text_43 = this.renderer.createText(this._el_42, 'Home', null);
        this._text_44 = this.renderer.createText(this._el_40, '\n				', null);
        this._text_45 = this.renderer.createText(this._el_26, '\n			', null);
        this._text_46 = this.renderer.createText(this._el_24, '\n\n		', null);
        this._text_47 = this.renderer.createText(this._el_2, '\n	', null);
        this._text_48 = this.renderer.createText(this._el_0, '\n', null);
        var disposable_0 = this.renderer.listen(this._el_18, 'click', this.eventHandler(this._handle_click_18_0.bind(this)));
        this._expr_1 = import7.UNINITIALIZED;
        this._expr_2 = import7.UNINITIALIZED;
        var disposable_1 = this.renderer.listen(this._el_30, 'click', this.eventHandler(this._handle_click_30_0.bind(this)));
        this._expr_4 = import7.UNINITIALIZED;
        this._expr_5 = import7.UNINITIALIZED;
        this._expr_6 = import7.UNINITIALIZED;
        var disposable_2 = this.renderer.listen(this._el_42, 'click', this.eventHandler(this._handle_click_42_0.bind(this)));
        this._expr_8 = import7.UNINITIALIZED;
        this._expr_9 = import7.UNINITIALIZED;
        this.init([], [
            this._el_0,
            this._text_1,
            this._el_2,
            this._text_3,
            this._el_4,
            this._text_5,
            this._el_6,
            this._text_7,
            this._el_8,
            this._text_9,
            this._text_10,
            this._el_11,
            this._text_12,
            this._el_13,
            this._text_14,
            this._el_15,
            this._text_16,
            this._text_17,
            this._el_18,
            this._text_19,
            this._el_20,
            this._text_21,
            this._text_22,
            this._text_23,
            this._el_24,
            this._text_25,
            this._el_26,
            this._text_27,
            this._el_28,
            this._text_29,
            this._el_30,
            this._text_31,
            this._el_32,
            this._text_33,
            this._text_34,
            this._el_35,
            this._text_36,
            this._text_37,
            this._text_38,
            this._text_39,
            this._el_40,
            this._text_41,
            this._el_42,
            this._text_43,
            this._text_44,
            this._text_45,
            this._text_46,
            this._text_47,
            this._text_48
        ], [
            disposable_0,
            disposable_1,
            disposable_2
        ], []);
        return null;
    };
    _View_AppHeaderComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import12.RouterLinkWithHref) && ((18 <= requestNodeIndex) && (requestNodeIndex <= 21)))) {
            return this._RouterLinkWithHref_18_3;
        }
        if (((token === import12.RouterLinkWithHref) && ((30 <= requestNodeIndex) && (requestNodeIndex <= 37)))) {
            return this._RouterLinkWithHref_30_3;
        }
        if (((token === import12.RouterLinkWithHref) && ((42 <= requestNodeIndex) && (requestNodeIndex <= 43)))) {
            return this._RouterLinkWithHref_42_3;
        }
        return notFoundResult;
    };
    _View_AppHeaderComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var changes = null;
        changes = null;
        var currVal_1 = '/home';
        if (import4.checkBinding(throwOnChange, this._expr_1, currVal_1)) {
            this._RouterLinkWithHref_18_3.routerLink = currVal_1;
            if ((changes === null)) {
                (changes = {});
            }
            changes['routerLink'] = new import7.SimpleChange(this._expr_1, currVal_1);
            this._expr_1 = currVal_1;
        }
        if ((changes !== null)) {
            this._RouterLinkWithHref_18_3.ngOnChanges(changes);
        }
        changes = null;
        var currVal_4 = '/job/list';
        if (import4.checkBinding(throwOnChange, this._expr_4, currVal_4)) {
            this._RouterLinkWithHref_30_3.routerLink = currVal_4;
            if ((changes === null)) {
                (changes = {});
            }
            changes['routerLink'] = new import7.SimpleChange(this._expr_4, currVal_4);
            this._expr_4 = currVal_4;
        }
        if ((changes !== null)) {
            this._RouterLinkWithHref_30_3.ngOnChanges(changes);
        }
        changes = null;
        var currVal_8 = '/home';
        if (import4.checkBinding(throwOnChange, this._expr_8, currVal_8)) {
            this._RouterLinkWithHref_42_3.routerLink = currVal_8;
            if ((changes === null)) {
                (changes = {});
            }
            changes['routerLink'] = new import7.SimpleChange(this._expr_8, currVal_8);
            this._expr_8 = currVal_8;
        }
        if ((changes !== null)) {
            this._RouterLinkWithHref_42_3.ngOnChanges(changes);
        }
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_2 = this._RouterLinkWithHref_18_3.href;
        if (import4.checkBinding(throwOnChange, this._expr_2, currVal_2)) {
            this.renderer.setElementProperty(this._el_18, 'href', this.viewUtils.sanitizer.sanitize(import16.SecurityContext.URL, currVal_2));
            this._expr_2 = currVal_2;
        }
        var currVal_5 = this._RouterLinkWithHref_30_3.href;
        if (import4.checkBinding(throwOnChange, this._expr_5, currVal_5)) {
            this.renderer.setElementProperty(this._el_30, 'href', this.viewUtils.sanitizer.sanitize(import16.SecurityContext.URL, currVal_5));
            this._expr_5 = currVal_5;
        }
        var currVal_6 = import4.interpolate(1, '', this.context.jobs, '');
        if (import4.checkBinding(throwOnChange, this._expr_6, currVal_6)) {
            this.renderer.setText(this._text_33, currVal_6);
            this._expr_6 = currVal_6;
        }
        var currVal_9 = this._RouterLinkWithHref_42_3.href;
        if (import4.checkBinding(throwOnChange, this._expr_9, currVal_9)) {
            this.renderer.setElementProperty(this._el_42, 'href', this.viewUtils.sanitizer.sanitize(import16.SecurityContext.URL, currVal_9));
            this._expr_9 = currVal_9;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    _View_AppHeaderComponent0.prototype.destroyInternal = function () {
        this._RouterLinkWithHref_18_3.ngOnDestroy();
        this._RouterLinkWithHref_30_3.ngOnDestroy();
        this._RouterLinkWithHref_42_3.ngOnDestroy();
    };
    _View_AppHeaderComponent0.prototype._handle_click_18_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_0 = (this._RouterLinkWithHref_18_3.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_0);
    };
    _View_AppHeaderComponent0.prototype._handle_click_30_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_0 = (this._RouterLinkWithHref_30_3.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_0);
    };
    _View_AppHeaderComponent0.prototype._handle_click_42_0 = function ($event) {
        this.markPathToRootAsCheckOnce();
        var pd_0 = (this._RouterLinkWithHref_42_3.onClick($event.button, $event.ctrlKey, $event.metaKey) !== false);
        return (true && pd_0);
    };
    return _View_AppHeaderComponent0;
}(import1.AppView));
function viewFactory_AppHeaderComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_AppHeaderComponent === null)) {
        (renderType_AppHeaderComponent = viewUtils.createRenderComponentType('', 0, import9.ViewEncapsulation.Emulated, styles_AppHeaderComponent, {}));
    }
    return new _View_AppHeaderComponent0(viewUtils, parentInjector, declarationEl);
}
exports.viewFactory_AppHeaderComponent0 = viewFactory_AppHeaderComponent0;
//# sourceMappingURL=app-header.component.ngfactory.js.map