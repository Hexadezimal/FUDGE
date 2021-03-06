"use strict";
// namespace FudgeUserInterface {
//     /**
//      * <select><option>Hallo</option></select>
//      */
//     import ƒ = FudgeCore;
//     export class ToggleButton extends HTMLButtonElement {
//         private toggleState: boolean;
//         public constructor(style: string) {
//             super();
//             this.type = "button";
//             this.toggleState = true;
//             this.classList.add(style);
//             this.classList.add("ToggleOn");
//             this.addEventListener("click", this.switchToggleState);
//         }
//         public setToggleState(toggleState: boolean): void {
//             this.toggleState = toggleState;
//             if (this.toggleState == true) {
//                 this.classList.add("ToggleOn");
//                 this.classList.remove("ToggleOff");
//             }
//             else {
//                 this.classList.remove("ToggleOn");
//                 this.classList.add("ToggleOff");
//             }
//         }
//         public getToggleState(): boolean {
//             return this.toggleState;
//         }
//         public toggle(): void {
//             this.setToggleState(!this.toggleState);
//         }
//         private switchToggleState = (_event: MouseEvent): void => {
//             this.setToggleState(!this.toggleState);
//         }
//     }
//     export class Stepper extends HTMLInputElement {
//         public constructor(_label: string, params: { min?: number, max?: number, step?: number, value?: number } = {}) {
//             super();
//             this.name = _label;
//             this.type = "number";
//             this.value = params.value.toString();
//             this.id = _label;
//             this.step = String(params.step) || "1";
//         }
//     }
//     export class FoldableFieldSet extends HTMLFieldSetElement {
//         public constructor(_legend: string) {
//             super();
//             let cntLegend: HTMLLegendElement = document.createElement("legend");
//             cntLegend.classList.add("unfoldable");
//             let btnFoldButton: HTMLButtonElement = new ToggleButton("FoldButton");
//             btnFoldButton.addEventListener("click", this.toggleFoldElement);
//             // btnfoldButton.classList.add("unfoldable");
//             let lblTitle: HTMLSpanElement = document.createElement("span");
//             lblTitle.textContent = _legend;
//             // lblTitle.classList.add("unfoldable");
//             cntLegend.appendChild(btnFoldButton);
//             cntLegend.appendChild(lblTitle);
//             this.appendChild(cntLegend);
//         }
//         private toggleFoldElement = (_event: MouseEvent): void => {
//             _event.preventDefault();
//             if (_event.target != _event.currentTarget) return;
//             //Get the fieldset the button belongs to
//             let children: HTMLCollection = this.children;
//             //fold or unfold all children that aren't unfoldable
//             for (let child of children) {
//                 if (!child.classList.contains("unfoldable")) {
//                     child.classList.toggle("folded");
//                 }
//             }
//         }
//     }
//     class MenuButton extends HTMLDivElement {
//         name: string;
//         private signature: string;
//         public constructor(_name: string, textcontent: string, parentSignature: string) {
//             super();
//             this.name = _name;
//             this.signature = parentSignature + "." + _name;
//             let button: HTMLButtonElement = document.createElement("button");
//             button.textContent = textcontent;
//             this.append(button);
//             button.addEventListener("click", this.resolveClick);
//         }
//         private resolveClick = (_event: MouseEvent): void => {
//             let event: CustomEvent = new CustomEvent(EVENT_USERINTERFACE.DROPMENUCLICK, { detail: this.signature, bubbles: true });
//             this.dispatchEvent(event);
//         }
//     }
//     class MenuContent extends HTMLDivElement {
//         public constructor(_submenu?: boolean) {
//             super();
//             if (_submenu) {
//                 this.classList.add("submenu-content");
//             }
//             else {
//                 this.classList.add("dropdown-content");
//             }
//         }
//     }
//     export class DropMenu extends HTMLDivElement {
//         name: string;
//         private content: MenuContent;
//         private signature: string;
//         public constructor(_name: string, _contentList: ƒ.Mutator, params: { _parentSignature?: string, _text?: string }) {
//             super();
//             let button: HTMLButtonElement = document.createElement("button");
//             button.name = _name;
//             if (params._text) {
//                 button.textContent = params._text;
//             }
//             else {
//                 button.textContent = _name;
//             }
//             button.addEventListener("click", this.toggleFoldContent);
//             window.addEventListener("click", this.collapseMenu);
//             let isSubmenu: boolean = (params._parentSignature != null);
//             if (params._parentSignature) {
//                 this.signature = params._parentSignature + "." + _name;
//             }
//             else {
//                 this.signature = _name;
//             }
//             this.append(button);
//             this.content = new MenuContent(isSubmenu);
//             if (params._parentSignature) {
//                 this.classList.add("submenu");
//             }
//             else {
//                 this.classList.add("dropdown");
//             }
//             this.content.classList.toggle("folded");
//             this.name = _name;
//             for (let key in _contentList) {
//                 if (typeof _contentList[key] == "object") {
//                     let subMenu: DropMenu = new DropMenu(key, <ƒ.Mutator>_contentList[key], { _parentSignature: this.signature });
//                     this.content.append(subMenu);
//                 }
//                 else if (typeof _contentList[key] == "string") {
//                     let contentEntry: MenuButton = new MenuButton(key, <string>_contentList[key], this.signature);
//                     this.content.append(contentEntry);
//                 }
//             }
//             this.append(this.content);
//         }
//         private toggleFoldContent = (_event: MouseEvent): void => {
//             this.content.classList.toggle("folded");
//         }
//         private collapseMenu = (_event: MouseEvent): void => {
//             if (!(this.contains(<HTMLElement>_event.target))) {
//                 if (!this.content.classList.contains("folded")) {
//                     this.toggleFoldContent(_event);
//                 }
//             }
//         }
//     }
//     customElements.define("ui-stepper", Stepper, { extends: "input" });
//     customElements.define("ui-toggle-button", ToggleButton, { extends: "button" });
//     customElements.define("ui-fold-fieldset", FoldableFieldSet, { extends: "fieldset" });
//     customElements.define("ui-dropdown", DropMenu, { extends: "div" });
//     customElements.define("ui-dropdown-button", MenuButton, { extends: "div" });
//     customElements.define("ui-dropdown-content", MenuContent, { extends: "div" });
// }
var FudgeUserInterface;
(function (FudgeUserInterface) {
    var ƒ = FudgeCore;
    class FoldableFieldSet extends HTMLFieldSetElement {
        constructor(_legend = "") {
            super();
            this.hndFocus = (_event) => {
                switch (_event.type) {
                    case FudgeUserInterface.EVENT_TREE.FOCUS_NEXT:
                        let next = this.nextElementSibling;
                        if (next && next.tabIndex > -1) {
                            next.focus();
                            _event.stopPropagation();
                        }
                        break;
                    case FudgeUserInterface.EVENT_TREE.FOCUS_PREVIOUS:
                        let previous = this.previousElementSibling;
                        if (previous && previous.tabIndex > -1) {
                            let fieldsets = previous.querySelectorAll("fieldset");
                            if (fieldsets.length == 0)
                                previous.focus();
                            else
                                fieldsets[fieldsets.length - 1].focus();
                            _event.stopPropagation();
                        }
                        break;
                    case FudgeUserInterface.EVENT_TREE.FOCUS_SET:
                        if (_event.target != this) {
                            this.focus();
                            _event.stopPropagation();
                        }
                        break;
                }
            };
            this.hndKey = (_event) => {
                _event.stopPropagation();
                // let target: HTMLElement = <HTMLElement>_event.target;
                switch (_event.code) {
                    case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                        if (!this.isOpen) {
                            this.open(true);
                            return;
                        }
                    case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                        let next = this;
                        if (this.isOpen)
                            next = this.querySelector("fieldset");
                        else
                            do {
                                next = next.nextElementSibling;
                            } while (next && next.tabIndex > -1);
                        if (next)
                            next.focus();
                        // next.dispatchEvent(new KeyboardEvent(EVENT_TREE.FOCUS_NEXT, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        else
                            this.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_NEXT, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        break;
                    case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                        if (this.isOpen) {
                            this.open(false);
                            return;
                        }
                    case ƒ.KEYBOARD_CODE.ARROW_UP:
                        let previous = this;
                        do {
                            previous = previous.previousElementSibling;
                        } while (previous && !(previous instanceof FoldableFieldSet));
                        if (previous)
                            if (_event.code == ƒ.KEYBOARD_CODE.ARROW_UP)
                                this.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_PREVIOUS, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                            else
                                previous.focus();
                        else
                            this.parentElement.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_SET, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        break;
                }
            };
            let cntLegend = document.createElement("legend");
            this.checkbox = document.createElement("input");
            this.checkbox.type = "checkbox";
            this.checkbox.checked = true;
            this.checkbox.tabIndex = -1;
            let lblTitle = document.createElement("span");
            lblTitle.textContent = _legend;
            this.appendChild(this.checkbox);
            cntLegend.appendChild(lblTitle);
            this.content = document.createElement("div");
            this.appendChild(cntLegend);
            this.appendChild(this.content);
            this.tabIndex = 0;
            this.addEventListener(FudgeUserInterface.EVENT_TREE.KEY_DOWN, this.hndKey);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.FOCUS_NEXT, this.hndFocus);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.FOCUS_PREVIOUS, this.hndFocus);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.FOCUS_SET, this.hndFocus);
            // this.checkbox.addEventListener(EVENT_TREE.KEY_DOWN, this.hndKey);
        }
        open(_open) {
            this.checkbox.checked = _open;
        }
        get isOpen() {
            return this.checkbox.checked;
        }
    }
    FudgeUserInterface.FoldableFieldSet = FoldableFieldSet;
    customElements.define("ui-fold-fieldset", FoldableFieldSet, { extends: "fieldset" });
})(FudgeUserInterface || (FudgeUserInterface = {}));
// namespace FudgeUserInterface {
//     import ƒ = FudgeCore;
//     // export abstract class ListController {
//     //     abstract listRoot: HTMLElement;
//     //     protected abstract toggleCollapse(_event: MouseEvent): void;
//     // }
//     abstract class CollapsableList extends HTMLUListElement {
//         header: HTMLLIElement;
//         content: HTMLElement;
//         constructor() {
//             super();
//             this.header = document.createElement("li");
//             this.content = document.createElement("ul");
//             this.appendChild(this.header);
//             this.appendChild(this.content);
//         }
//         public collapse(element: HTMLElement): void {
//             (<CollapsableList>element).content.classList.toggle("folded");
//         }
//     }
//     export class CollapsableNodeList extends CollapsableList {
//         node: ƒ.Node;
//         constructor(_node: ƒ.Node, _name: string, _unfolded: boolean = false) {
//             super();
//             this.node = _node;
//             let buttonState: string;
//             if (this.node.getChildren().length != 0)
//                 buttonState = "FoldButton";
//             else
//                 buttonState = "invisible";
//             let btnToggle: HTMLButtonElement = new ToggleButton(buttonState);
//             (<ToggleButton>btnToggle).setToggleState(_unfolded);
//             btnToggle.addEventListener("click", this.collapseEvent);
//             this.header.appendChild(btnToggle);
//             let lblName: HTMLSpanElement = document.createElement("span");
//             lblName.textContent = _name;
//             lblName.addEventListener("click", this.selectNode);
//             this.header.appendChild(lblName);
//         }
//         public selectNode = (_event: MouseEvent): void => {
//             let event: Event = new CustomEvent(EVENT_USERINTERFACE.SELECT, { bubbles: true, detail: this.node });
//             this.dispatchEvent(event);
//         }
//         public collapseEvent = (_event: MouseEvent): void => {
//             let event: Event = new CustomEvent(EVENT_USERINTERFACE.COLLAPSE, { bubbles: true, detail: this });
//             this.dispatchEvent(event);
//         }
//     }
//     export class CollapsableAnimationList extends CollapsableList {
//         mutator: ƒ.Mutator;
//         name: string;
//         index: ƒ.Mutator;
//         constructor(_mutator: ƒ.Mutator, _name: string, _unfolded: boolean = false) {
//             super();
//             this.mutator = _mutator;
//             this.name = _name;
//             this.index = {};
//             let btnToggle: HTMLButtonElement = new ToggleButton("FoldButton");
//             (<ToggleButton>btnToggle).setToggleState(_unfolded);
//             btnToggle.addEventListener("click", this.collapseEvent);
//             this.header.appendChild(btnToggle);
//             let lblName: HTMLSpanElement = document.createElement("span");
//             lblName.textContent = _name;
//             this.header.appendChild(lblName);
//             this.buildContent(_mutator);
//             this.content.addEventListener("input", this.updateMutator);
//         }
//         public collapseEvent = (_event: MouseEvent): void => {
//             let event: Event = new CustomEvent(EVENT_USERINTERFACE.COLLAPSE, { bubbles: true, detail: this });
//             this.dispatchEvent(event);
//         }
//         public buildContent(_mutator: ƒ.Mutator): void {
//             for (let key in _mutator) {
//                 if (typeof _mutator[key] == "object") {
//                     let newList: CollapsableAnimationList = new CollapsableAnimationList(<ƒ.Mutator>_mutator[key], key);
//                     this.content.append(newList);
//                     this.index[key] = newList.getElementIndex();
//                 }
//                 else {
//                     let listEntry: HTMLLIElement = document.createElement("li");
//                     Generator.createLabelElement(key, listEntry);
//                     let inputEntry: HTMLSpanElement = Generator.createStepperElement(key, listEntry, { _value: (<number>_mutator[key]) });
//                     this.content.append(listEntry);
//                     this.index[key] = inputEntry;
//                 }
//             }
//         }
//         public getMutator(): ƒ.Mutator {
//             return this.mutator;
//         }
//         public setMutator(_mutator: ƒ.Mutator): void {
//             this.collapse(this.content);
//             this.mutator = _mutator;
//             this.buildContent(_mutator);
//         }
//         public getElementIndex(): ƒ.Mutator {
//             return this.index;
//         }
//         private updateMutator = (_event: Event): void => {
//             let target: HTMLInputElement = <HTMLInputElement>_event.target;
//             this.mutator[target.id] = parseFloat(target.value);
//             _event.cancelBubble = true;
//             let event: Event = new CustomEvent(EVENT_USERINTERFACE.UPDATE, { bubbles: true, detail: this.mutator });
//             this.dispatchEvent(event);
//         }
//     }
//     customElements.define("ui-node-list", CollapsableNodeList, { extends: "ul" });
//     customElements.define("ui-animation-list", CollapsableAnimationList, { extends: "ul" });
// }
var FudgeUserInterface;
(function (FudgeUserInterface) {
    class MenuButton extends HTMLDivElement {
        constructor(_name, textcontent, parentSignature) {
            super();
            this.resolveClick = (_event) => {
                let event = new CustomEvent("dropMenuClick" /* DROPMENUCLICK */, { detail: this.signature, bubbles: true });
                this.dispatchEvent(event);
            };
            this.name = _name;
            this.signature = parentSignature + "." + _name;
            let button = document.createElement("button");
            button.textContent = textcontent;
            this.append(button);
            button.addEventListener("click", this.resolveClick);
        }
    }
    class MenuContent extends HTMLDivElement {
        constructor(_submenu) {
            super();
            if (_submenu) {
                this.classList.add("submenu-content");
            }
            else {
                this.classList.add("dropdown-content");
            }
        }
    }
    class DropMenu extends HTMLDivElement {
        constructor(_name, _contentList, params) {
            super();
            this.toggleFoldContent = (_event) => {
                this.content.classList.toggle("folded");
            };
            this.collapseMenu = (_event) => {
                if (!(this.contains(_event.target))) {
                    if (!this.content.classList.contains("folded")) {
                        this.toggleFoldContent(_event);
                    }
                }
            };
            let button = document.createElement("button");
            button.name = _name;
            if (params._text) {
                button.textContent = params._text;
            }
            else {
                button.textContent = _name;
            }
            button.addEventListener("click", this.toggleFoldContent);
            window.addEventListener("click", this.collapseMenu);
            let isSubmenu = (params._parentSignature != null);
            if (params._parentSignature) {
                this.signature = params._parentSignature + "." + _name;
            }
            else {
                this.signature = _name;
            }
            this.append(button);
            this.content = new MenuContent(isSubmenu);
            if (params._parentSignature) {
                this.classList.add("submenu");
            }
            else {
                this.classList.add("dropdown");
            }
            this.content.classList.toggle("folded");
            this.name = _name;
            for (let key in _contentList) {
                if (typeof _contentList[key] == "object") {
                    let subMenu = new DropMenu(key, _contentList[key], { _parentSignature: this.signature });
                    this.content.append(subMenu);
                }
                else if (typeof _contentList[key] == "string") {
                    let contentEntry = new MenuButton(key, _contentList[key], this.signature);
                    this.content.append(contentEntry);
                }
            }
            this.append(this.content);
        }
    }
    FudgeUserInterface.DropMenu = DropMenu;
    customElements.define("ui-dropdown", DropMenu, { extends: "div" });
    customElements.define("ui-dropdown-button", MenuButton, { extends: "div" });
    customElements.define("ui-dropdown-content", MenuContent, { extends: "div" });
})(FudgeUserInterface || (FudgeUserInterface = {}));
var FudgeUserInterface;
(function (FudgeUserInterface) {
    class MultiLevelMenuManager {
        static buildFromSignature(_signature, _mutator) {
            let mutator = _mutator || {};
            let signatureLevels = _signature.split(".");
            if (signatureLevels.length > 1) {
                let subSignature = signatureLevels[1];
                for (let i = 2; i < signatureLevels.length; i++) {
                    subSignature = subSignature + "." + signatureLevels[i];
                }
                if (mutator[signatureLevels[0]] != null) {
                    mutator[signatureLevels[0]] = this.buildFromSignature(subSignature, mutator[signatureLevels[0]]);
                }
                else {
                    mutator[signatureLevels[0]] = this.buildFromSignature(subSignature);
                }
            }
            else {
                mutator[signatureLevels[0]] = signatureLevels[0];
            }
            return mutator;
        }
    }
    FudgeUserInterface.MultiLevelMenuManager = MultiLevelMenuManager;
})(FudgeUserInterface || (FudgeUserInterface = {}));
var FudgeUserInterface;
(function (FudgeUserInterface) {
    // import ƒ = FudgeCore;
    class Stepper extends HTMLInputElement {
        constructor(_label = "", params = {}) {
            super();
            this.name = _label;
            this.type = "number";
            this.value = params.value.toString();
            // this.id = _label;
            this.step = String(params.step) || "1";
        }
    }
    FudgeUserInterface.Stepper = Stepper;
    customElements.define("ui-stepper", Stepper, { extends: "input" });
})(FudgeUserInterface || (FudgeUserInterface = {}));
///<reference path="../../../../Core/Build/FudgeCore.d.ts"/>
var FudgeUserInterface;
///<reference path="../../../../Core/Build/FudgeCore.d.ts"/>
(function (FudgeUserInterface) {
    /**
    * Extension of ul-element that keeps a list of [[TreeItem]]s to represent a branch in a tree
    */
    class TreeList extends HTMLUListElement {
        constructor(_items = []) {
            super();
            this.addItems(_items);
            this.className = "tree";
        }
        /**
         * Opens the tree along the given path to show the objects the path includes
         * @param _path An array of objects starting with one being contained in this treelist and following the correct hierarchy of successors
         * @param _focus If true (default) the last object found in the tree gets the focus
         */
        show(_path, _focus = true) {
            let currentTree = this;
            for (let data of _path) {
                let item = currentTree.findItem(data);
                item.focus();
                let content = item.getBranch();
                if (!content) {
                    item.open(true);
                    content = item.getBranch();
                }
                currentTree = content;
            }
        }
        /**
         * Restructures the list to sync with the given list.
         * [[TreeItem]]s referencing the same object remain in the list, new items get added in the order of appearance, obsolete ones are deleted.
         * @param _tree A list to sync this with
         */
        restructure(_tree) {
            let items = [];
            for (let item of _tree.getItems()) {
                let found = this.findItem(item.data);
                if (found) {
                    found.setLabel(item.display);
                    found.hasChildren = item.hasChildren;
                    if (!found.hasChildren)
                        found.open(false);
                    items.push(found);
                }
                else
                    items.push(item);
            }
            this.innerHTML = "";
            this.addItems(items);
        }
        /**
         * Returns the [[TreeItem]] of this list referencing the given object or null, if not found
         */
        findItem(_data) {
            for (let item of this.children)
                if (item.data == _data)
                    return item;
            return null;
        }
        /**
         * Adds the given [[TreeItem]]s at the end of this list
         */
        addItems(_items) {
            for (let item of _items) {
                this.appendChild(item);
            }
        }
        /**
         * Returns the content of this list as array of [[TreeItem]]s
         */
        getItems() {
            return this.children;
        }
        displaySelection(_data) {
            let items = this.querySelectorAll("li");
            for (let item of items)
                item.selected = (_data != null && _data.indexOf(item.data) > -1);
        }
        selectInterval(_dataStart, _dataEnd) {
            let items = this.querySelectorAll("li");
            let selecting = false;
            let end = null;
            for (let item of items) {
                if (!selecting) {
                    selecting = true;
                    if (item.data == _dataStart)
                        end = _dataEnd;
                    else if (item.data == _dataEnd)
                        end = _dataStart;
                    else
                        selecting = false;
                }
                if (selecting) {
                    item.select(true, false);
                    if (item.data == end)
                        break;
                }
            }
        }
        delete(_data) {
            let items = this.querySelectorAll("li");
            let deleted = [];
            for (let item of items)
                if (_data.indexOf(item.data) > -1) {
                    item.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.UPDATE, { bubbles: true }));
                    deleted.push(item.parentNode.removeChild(item));
                }
            return deleted;
        }
        findOpen(_data) {
            let items = this.querySelectorAll("li");
            for (let item of items)
                if (_data == item.data)
                    return item;
            return null;
        }
    }
    FudgeUserInterface.TreeList = TreeList;
    customElements.define("ul-tree-list", TreeList, { extends: "ul" });
})(FudgeUserInterface || (FudgeUserInterface = {}));
///<reference path="TreeList.ts"/>
var FudgeUserInterface;
///<reference path="TreeList.ts"/>
(function (FudgeUserInterface) {
    let TREE_CLASS;
    (function (TREE_CLASS) {
        TREE_CLASS["SELECTED"] = "selected";
        TREE_CLASS["INACTIVE"] = "inactive";
    })(TREE_CLASS = FudgeUserInterface.TREE_CLASS || (FudgeUserInterface.TREE_CLASS = {}));
    let EVENT_TREE;
    (function (EVENT_TREE) {
        EVENT_TREE["RENAME"] = "rename";
        EVENT_TREE["OPEN"] = "open";
        EVENT_TREE["FOCUS_NEXT"] = "focusNext";
        EVENT_TREE["FOCUS_PREVIOUS"] = "focusPrevious";
        EVENT_TREE["FOCUS_IN"] = "focusin";
        EVENT_TREE["FOCUS_OUT"] = "focusout";
        EVENT_TREE["DELETE"] = "delete";
        EVENT_TREE["CHANGE"] = "change";
        EVENT_TREE["DOUBLE_CLICK"] = "dblclick";
        EVENT_TREE["KEY_DOWN"] = "keydown";
        EVENT_TREE["DRAG_START"] = "dragstart";
        EVENT_TREE["DRAG_OVER"] = "dragover";
        EVENT_TREE["DROP"] = "drop";
        EVENT_TREE["POINTER_UP"] = "pointerup";
        EVENT_TREE["SELECT"] = "itemselect";
        EVENT_TREE["UPDATE"] = "update";
        EVENT_TREE["ESCAPE"] = "escape";
        EVENT_TREE["COPY"] = "copy";
        EVENT_TREE["CUT"] = "cut";
        EVENT_TREE["PASTE"] = "paste";
        EVENT_TREE["FOCUS_SET"] = "focusSet";
    })(EVENT_TREE = FudgeUserInterface.EVENT_TREE || (FudgeUserInterface.EVENT_TREE = {}));
    /**
     * Extension of [[TreeList]] that represents the root of a tree control
     * ```plaintext
     * tree <ul>
     * ├ treeItem <li>
     * ├ treeItem <li>
     * │ └ treeList <ul>
     * │   ├ treeItem <li>
     * │   └ treeItem <li>
     * └ treeItem <li>
     * ```
     */
    class Tree extends FudgeUserInterface.TreeList {
        constructor(_controller, _root) {
            super([]);
            this.hndDelete = (_event) => {
                let target = _event.target;
                _event.stopPropagation();
                let remove = this.controller.delete([target.data]);
                this.delete(remove);
            };
            this.hndEscape = (_event) => {
                this.clearSelection();
            };
            this.hndCopyPaste = (_event) => {
                console.log(_event);
                _event.stopPropagation();
                let target = _event.target;
                switch (_event.type) {
                    case EVENT_TREE.COPY:
                        this.controller.copyPaste.sources = this.controller.copy([...this.controller.selection]);
                        break;
                    case EVENT_TREE.PASTE:
                        this.addChildren(this.controller.copyPaste.sources, target.data);
                        break;
                    case EVENT_TREE.CUT:
                        this.controller.copyPaste.sources = this.controller.copy([...this.controller.selection]);
                        let cut = this.controller.delete(this.controller.selection);
                        this.delete(cut);
                        break;
                }
            };
            this.hndFocus = (_event) => {
                _event.stopPropagation();
                let items = Array.from(this.querySelectorAll("li"));
                let target = _event.target;
                let index = items.indexOf(target);
                if (index < 0)
                    return;
                if (_event.shiftKey && this.controller.selection.length == 0)
                    target.select(true);
                switch (_event.type) {
                    case EVENT_TREE.FOCUS_NEXT:
                        if (++index < items.length)
                            items[index].focus();
                        break;
                    case EVENT_TREE.FOCUS_PREVIOUS:
                        if (--index >= 0)
                            items[index].focus();
                        break;
                    default:
                        break;
                }
                if (_event.shiftKey)
                    document.activeElement.select(true);
                else if (!_event.ctrlKey)
                    this.clearSelection();
            };
            this.controller = _controller;
            let root = new FudgeUserInterface.TreeItem(this.controller, _root);
            this.appendChild(root);
            this.addEventListener(EVENT_TREE.OPEN, this.hndOpen);
            this.addEventListener(EVENT_TREE.RENAME, this.hndRename);
            this.addEventListener(EVENT_TREE.SELECT, this.hndSelect);
            this.addEventListener(EVENT_TREE.DROP, this.hndDrop);
            this.addEventListener(EVENT_TREE.DELETE, this.hndDelete);
            this.addEventListener(EVENT_TREE.ESCAPE, this.hndEscape);
            this.addEventListener(EVENT_TREE.COPY, this.hndCopyPaste);
            this.addEventListener(EVENT_TREE.PASTE, this.hndCopyPaste);
            this.addEventListener(EVENT_TREE.CUT, this.hndCopyPaste);
            // @ts-ignore
            this.addEventListener(EVENT_TREE.FOCUS_NEXT, this.hndFocus);
            // @ts-ignore
            this.addEventListener(EVENT_TREE.FOCUS_PREVIOUS, this.hndFocus);
        }
        /**
         * Clear the current selection
         */
        clearSelection() {
            this.controller.selection.splice(0);
            this.displaySelection(this.controller.selection);
        }
        /**
         * Return the object in focus
         */
        getFocussed() {
            let items = Array.from(this.querySelectorAll("li"));
            let found = items.indexOf(document.activeElement);
            if (found > -1)
                return items[found].data;
            return null;
        }
        hndOpen(_event) {
            let item = _event.target;
            let children = this.controller.getChildren(item.data);
            if (!children || children.length == 0)
                return;
            let branch = this.createBranch(children);
            item.setBranch(branch);
            this.displaySelection(this.controller.selection);
        }
        createBranch(_data) {
            let branch = new FudgeUserInterface.TreeList([]);
            for (let child of _data) {
                branch.addItems([new FudgeUserInterface.TreeItem(this.controller, child)]);
            }
            return branch;
        }
        hndRename(_event) {
            let item = _event.target.parentNode;
            let renamed = this.controller.rename(item.data, item.getLabel());
            if (renamed)
                item.setLabel(this.controller.getLabel(item.data));
        }
        // Callback / Eventhandler in Tree
        hndSelect(_event) {
            _event.stopPropagation();
            let detail = _event.detail;
            let index = this.controller.selection.indexOf(detail.data);
            if (detail.interval) {
                let dataStart = this.controller.selection[0];
                let dataEnd = detail.data;
                this.clearSelection();
                this.selectInterval(dataStart, dataEnd);
                return;
            }
            if (index >= 0 && detail.additive)
                this.controller.selection.splice(index, 1);
            else {
                if (!detail.additive)
                    this.clearSelection();
                this.controller.selection.push(detail.data);
            }
            this.displaySelection(this.controller.selection);
        }
        hndDrop(_event) {
            _event.stopPropagation();
            this.addChildren(this.controller.dragDrop.sources, this.controller.dragDrop.target);
        }
        addChildren(_children, _target) {
            // if drop target included in children -> refuse
            if (_children.indexOf(_target) > -1)
                return;
            // add only the objects the addChildren-method of the controller returns
            let move = this.controller.addChildren(_children, _target);
            if (!move || move.length == 0)
                return;
            // TODO: don't, when copying or coming from another source
            this.delete(move);
            let targetData = _target;
            let targetItem = this.findOpen(targetData);
            let branch = this.createBranch(this.controller.getChildren(targetData));
            let old = targetItem.getBranch();
            targetItem.hasChildren = true;
            if (old)
                old.restructure(branch);
            else
                targetItem.open(true);
            _children = [];
            _target = null;
        }
    }
    FudgeUserInterface.Tree = Tree;
    customElements.define("ul-tree", Tree, { extends: "ul" });
})(FudgeUserInterface || (FudgeUserInterface = {}));
var FudgeUserInterface;
(function (FudgeUserInterface) {
    /**
     * Subclass this to create a broker between your data and a [[Tree]] to display and manipulate it.
     * The [[Tree]] doesn't know how your data is structured and how to handle it, the controller implements the methods needed
     */
    class TreeController {
        constructor() {
            /** Stores references to selected objects. Override with a reference in outer scope, if selection should also operate outside of tree */
            this.selection = [];
            /** Stores references to objects being dragged, and objects to drop on. Override with a reference in outer scope, if drag&drop should operate outside of tree */
            this.dragDrop = { sources: [], target: null };
            /** Stores references to objects being dragged, and objects to drop on. Override with a reference in outer scope, if drag&drop should operate outside of tree */
            this.copyPaste = { sources: [], target: null };
        }
    }
    FudgeUserInterface.TreeController = TreeController;
})(FudgeUserInterface || (FudgeUserInterface = {}));
///<reference path="../../../../Core/Build/FudgeCore.d.ts"/>
var FudgeUserInterface;
///<reference path="../../../../Core/Build/FudgeCore.d.ts"/>
(function (FudgeUserInterface) {
    var ƒ = FudgeCore;
    /**
     * Extension of li-element that represents an object in a [[TreeList]] with a checkbox and a textinput as content.
     * Additionally, may hold an instance of [[TreeList]] as branch to display children of the corresponding object.
     */
    class TreeItem extends HTMLLIElement {
        constructor(_controller, _data) {
            super();
            this.display = "TreeItem";
            this.classes = [];
            this.data = null;
            this.hndFocus = (_event) => {
                if (_event.target == this.label)
                    this.label.disabled = true;
            };
            this.hndKey = (_event) => {
                _event.stopPropagation();
                let content = this.querySelector("ul");
                switch (_event.code) {
                    case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                        if (this.hasChildren && !content)
                            this.open(true);
                        else
                            this.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_NEXT, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        break;
                    case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                        if (content)
                            this.open(false);
                        else
                            this.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_PREVIOUS, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        break;
                    case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                        this.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_NEXT, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        break;
                    case ƒ.KEYBOARD_CODE.ARROW_UP:
                        this.dispatchEvent(new KeyboardEvent(FudgeUserInterface.EVENT_TREE.FOCUS_PREVIOUS, { bubbles: true, shiftKey: _event.shiftKey, ctrlKey: _event.ctrlKey }));
                        break;
                    case ƒ.KEYBOARD_CODE.F2:
                        this.startTypingLabel();
                        break;
                    case ƒ.KEYBOARD_CODE.SPACE:
                        this.select(_event.ctrlKey, _event.shiftKey);
                        break;
                    case ƒ.KEYBOARD_CODE.DELETE:
                        this.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.DELETE, { bubbles: true }));
                        break;
                    case ƒ.KEYBOARD_CODE.C:
                        if (!_event.ctrlKey)
                            break;
                        event.preventDefault();
                        this.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.COPY, { bubbles: true }));
                        break;
                    case ƒ.KEYBOARD_CODE.V:
                        if (!_event.ctrlKey)
                            break;
                        event.preventDefault();
                        this.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.PASTE, { bubbles: true }));
                        break;
                    case ƒ.KEYBOARD_CODE.X:
                        if (!_event.ctrlKey)
                            break;
                        event.preventDefault();
                        this.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.CUT, { bubbles: true }));
                        break;
                }
            };
            this.hndDblClick = (_event) => {
                _event.stopPropagation();
                if (_event.target != this.checkbox)
                    this.startTypingLabel();
            };
            this.hndChange = (_event) => {
                let target = _event.target;
                let item = target.parentElement;
                _event.stopPropagation();
                switch (target.type) {
                    case "checkbox":
                        this.open(target.checked);
                        break;
                    case "text":
                        target.disabled = true;
                        item.focus();
                        target.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.RENAME, { bubbles: true }));
                        break;
                    case "default":
                        console.log(target);
                        break;
                }
            };
            this.hndDragStart = (_event) => {
                _event.stopPropagation();
                this.controller.dragDrop.sources = [];
                if (this.selected)
                    this.controller.dragDrop.sources = this.controller.selection;
                else
                    this.controller.dragDrop.sources = [this.data];
                _event.dataTransfer.effectAllowed = "all";
            };
            this.hndDragOver = (_event) => {
                _event.stopPropagation();
                _event.preventDefault();
                this.controller.dragDrop.target = this.data;
                _event.dataTransfer.dropEffect = "move";
            };
            this.hndPointerUp = (_event) => {
                _event.stopPropagation();
                if (_event.target == this.checkbox)
                    return;
                this.select(_event.ctrlKey, _event.shiftKey);
            };
            this.hndUpdate = (_event) => {
                if (_event.currentTarget == _event.target)
                    return;
                _event.stopPropagation();
                this.hasChildren = this.controller.hasChildren(this.data);
            };
            this.controller = _controller;
            this.data = _data;
            this.display = this.controller.getLabel(_data);
            // TODO: handle cssClasses
            this.create();
            this.hasChildren = this.controller.hasChildren(_data);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.CHANGE, this.hndChange);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.DOUBLE_CLICK, this.hndDblClick);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.FOCUS_OUT, this.hndFocus);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.KEY_DOWN, this.hndKey);
            // this.addEventListener(EVENT_TREE.FOCUS_NEXT, this.hndFocus);
            // this.addEventListener(EVENT_TREE.FOCUS_PREVIOUS, this.hndFocus);
            this.draggable = true;
            this.addEventListener(FudgeUserInterface.EVENT_TREE.DRAG_START, this.hndDragStart);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.DRAG_OVER, this.hndDragOver);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.POINTER_UP, this.hndPointerUp);
            this.addEventListener(FudgeUserInterface.EVENT_TREE.UPDATE, this.hndUpdate);
        }
        /**
         * Returns true, when this item has a visible checkbox in front to open the subsequent branch
         */
        get hasChildren() {
            return this.checkbox.style.visibility != "hidden";
        }
        /**
         * Shows or hides the checkbox for opening the subsequent branch
         */
        set hasChildren(_has) {
            this.checkbox.style.visibility = _has ? "visible" : "hidden";
        }
        /**
         * Set the label text to show
         */
        setLabel(_text) {
            this.label.value = _text;
        }
        /**
         * Get the label text shown
         */
        getLabel() {
            return this.label.value;
        }
        /**
         * Tries to open the [[TreeList]] of children, by dispatching [[EVENT_TREE.OPEN]].
         * The user of the tree needs to add an event listener to the tree
         * in order to create that [[TreeList]] and add it as branch to this item
         * @param _open If false, the item will be closed
         */
        open(_open) {
            this.removeBranch();
            if (_open)
                this.dispatchEvent(new Event(FudgeUserInterface.EVENT_TREE.OPEN, { bubbles: true }));
            this.querySelector("input[type='checkbox']").checked = _open;
        }
        /**
         * Returns a list of all data referenced by the items succeeding this
         */
        getOpenData() {
            let list = this.querySelectorAll("li");
            let data = [];
            for (let item of list)
                data.push(item.data);
            return data;
        }
        /**
         * Sets the branch of children of this item. The branch must be a previously compiled [[TreeList]]
         */
        setBranch(_branch) {
            this.removeBranch();
            if (_branch)
                this.appendChild(_branch);
        }
        /**
         * Returns the branch of children of this item.
         */
        getBranch() {
            return this.querySelector("ul");
        }
        /**
         * Returns attaches or detaches the [[TREE_CLASS.SELECTED]] to this item
         */
        set selected(_on) {
            if (_on)
                this.classList.add(FudgeUserInterface.TREE_CLASS.SELECTED);
            else
                this.classList.remove(FudgeUserInterface.TREE_CLASS.SELECTED);
        }
        /**
         * Returns true if the [[TREE_CLASSES.SELECTED]] is attached to this item
         */
        get selected() {
            return this.classList.contains(FudgeUserInterface.TREE_CLASS.SELECTED);
        }
        /**
         * Dispatches the [[EVENT_TREE.SELECT]] event
         * @param _additive For multiple selection (+Ctrl)
         * @param _interval For selection over interval (+Shift)
         */
        select(_additive, _interval = false) {
            let event = new CustomEvent(FudgeUserInterface.EVENT_TREE.SELECT, { bubbles: true, detail: { data: this.data, additive: _additive, interval: _interval } });
            this.dispatchEvent(event);
        }
        /**
         * Removes the branch of children from this item
         */
        removeBranch() {
            let content = this.getBranch();
            if (!content)
                return;
            this.removeChild(content);
        }
        create() {
            this.checkbox = document.createElement("input");
            this.checkbox.type = "checkbox";
            this.appendChild(this.checkbox);
            this.label = document.createElement("input");
            this.label.type = "text";
            this.label.disabled = true;
            this.label.value = this.display;
            this.appendChild(this.label);
            this.tabIndex = 0;
        }
        startTypingLabel() {
            this.label.disabled = false;
            this.label.focus();
        }
    }
    FudgeUserInterface.TreeItem = TreeItem;
    customElements.define("li-tree-item", TreeItem, { extends: "li" });
})(FudgeUserInterface || (FudgeUserInterface = {}));
/// <reference path="../../../Core/Build/FudgeCore.d.ts"/>
var FudgeUserInterface;
/// <reference path="../../../Core/Build/FudgeCore.d.ts"/>
(function (FudgeUserInterface) {
    var ƒ = FudgeCore;
    class Generator {
        /**
         * Creates a userinterface for a [[FudgeCore.Mutable]]
         */
        static createMutable(_mutable, _name) {
            let mutable = new FudgeUserInterface.Mutable(_mutable, this.createFieldsetFromMutable(_mutable, _name));
            return mutable;
        }
        static createFieldsetFromMutable(_mutable, _name, _mutator) {
            let name = _name || _mutable.constructor.name;
            let mutator = _mutator || _mutable.getMutator();
            let mutatorTypes = _mutable.getMutatorAttributeTypes(mutator);
            let fieldset = Generator.createFoldableFieldset(name);
            Generator.addMutator(mutator, mutatorTypes, fieldset.content, _mutable);
            return fieldset;
        }
        static addMutator(_mutator, _mutatorTypes, _parent, _mutable) {
            try {
                for (let key in _mutatorTypes) {
                    let type = _mutatorTypes[key];
                    let value = _mutator[key].toString();
                    if (type instanceof Object) {
                        //Type is Enum
                        //
                        Generator.createLabelElement(key, _parent);
                        Generator.createDropdown(key, type, value, _parent);
                    }
                    else {
                        switch (type) {
                            case "Number":
                                Generator.createLabelElement(key, _parent, { value: key });
                                // Generator.createTextElement(key, _parent, { _value: value })
                                let numValue = parseInt(value);
                                Generator.createStepperElement(key, _parent, { value: numValue });
                                break;
                            case "Boolean":
                                Generator.createLabelElement(key, _parent, { value: key });
                                Generator.createCheckboxElement(key, (value == "true"), _parent);
                                break;
                            case "String":
                                Generator.createLabelElement(key, _parent, { value: key });
                                Generator.createTextElement(key, _parent, { value: value });
                                break;
                            // Some other complex subclass of Mutable
                            default:
                                let subMutable;
                                // subMutable = (<ƒ.General>_mutable)[key];
                                // subMutable = Object.getOwnPropertyDescriptor(_mutable, key).value;
                                subMutable = Reflect.get(_mutable, key);
                                let fieldset = Generator.createFieldsetFromMutable(subMutable, key, _mutator[key]);
                                _parent.appendChild(fieldset);
                                break;
                        }
                    }
                }
            }
            catch (_error) {
                ƒ.Debug.fudge(_error);
            }
        }
        static createDropdown(_name, _content, _value, _parent, _cssClass) {
            let dropdown = document.createElement("select");
            // TODO: unique ids
            dropdown.id = _name;
            dropdown.name = _name;
            for (let value in _content) {
                let entry = document.createElement("option");
                entry.text = value;
                entry.value = value;
                if (value.toUpperCase() == _value.toUpperCase()) {
                    entry.selected = true;
                }
                dropdown.add(entry);
            }
            _parent.appendChild(dropdown);
            return dropdown;
        }
        // public static createFieldset(_legend: string, _parent: HTMLElement, _cssClass?: string): HTMLFieldSetElement {
        //   let cntfieldset: HTMLFieldSetElement = document.createElement("fieldset");
        //   cntfieldset.id = _legend;
        //   let legend: HTMLLegendElement = document.createElement("legend");
        //   legend.innerHTML = _legend;
        //   cntfieldset.appendChild(legend);
        //   _parent.appendChild(cntfieldset);
        //   return cntfieldset;
        // }
        static createFoldableFieldset(_legend) {
            let cntFoldFieldset = new FudgeUserInterface.FoldableFieldSet(_legend);
            //TODO: unique ids
            cntFoldFieldset.id = _legend;
            cntFoldFieldset.name = _legend;
            return cntFoldFieldset;
        }
        static createLabelElement(_name, _parent, params = {}) {
            let label = document.createElement("label");
            if (params.value == undefined)
                params.value = _name;
            label.innerText = params.value;
            if (params.cssClass != undefined)
                label.classList.add(params.cssClass);
            label.name = "_" + _name;
            _parent.appendChild(label);
            return label;
        }
        static createTextElement(_name, _parent, params = {}) {
            let text = document.createElement("input");
            if (params.value == undefined)
                params.value = "";
            if (!params.cssClass == undefined)
                text.classList.add(params.cssClass);
            //TODO: ids must be unique
            text.id = _name;
            text.name = _name;
            text.value = params.value;
            _parent.appendChild(text);
            return text;
        }
        static createCheckboxElement(_name, _checked, _parent, _cssClass) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = _checked;
            checkbox.classList.add(_cssClass);
            checkbox.name = _name;
            // TODO: try to stick to conventions and make ids unique...
            checkbox.id = _name;
            _parent.appendChild(checkbox);
            return checkbox;
        }
        static createStepperElement(_name, _parent, params = {}) {
            if (params.value == undefined)
                params.value = 0;
            let stepper = new FudgeUserInterface.Stepper(_name, { value: params.value });
            _parent.appendChild(stepper);
            return stepper;
        }
    }
    FudgeUserInterface.Generator = Generator;
})(FudgeUserInterface || (FudgeUserInterface = {}));
// / <reference types="../../../Core/Build/FudgeCore"/>
var FudgeUserInterface;
// / <reference types="../../../Core/Build/FudgeCore"/>
(function (FudgeUserInterface) {
    class Mutable {
        constructor(_mutable, _ui) {
            this.timeUpdate = 190;
            this.mutateOnInput = (_event) => {
                this.mutator = this.updateMutator(this.mutable, this.ui);
                this.mutable.mutate(this.mutator);
                _event.stopPropagation();
            };
            this.refresh = (_event) => {
                this.mutable.updateMutator(this.mutator);
                this.update(this.mutable, this.ui);
            };
            this.ui = _ui;
            this.mutable = _mutable;
            this.mutator = _mutable.getMutator();
            // TODO: examine, if ui-Mutables should register to one common interval, instead of each installing its own.
            window.setInterval(this.refresh, this.timeUpdate);
            this.ui.addEventListener("input", this.mutateOnInput);
        }
        // TODO: optimize updates with cascade of delegates instead of switches
        updateMutator(_mutable, _ui, _mutator, _types) {
            let mutator = _mutator || _mutable.getMutator();
            let mutatorTypes = _types || _mutable.getMutatorAttributeTypes(mutator);
            for (let key in mutator) {
                if (this.ui.querySelector(`[name=${key}]`) != null) {
                    let type = mutatorTypes[key];
                    if (type instanceof Object) {
                        let selectElement = _ui.querySelector(`[name=${key}]`);
                        selectElement.value = mutator[key];
                    }
                    else {
                        let element = _ui.querySelector(`[name=${key}]`);
                        let input = element;
                        switch (type) {
                            case "Boolean":
                                mutator[key] = input.checked;
                                break;
                            case "String":
                            case "Number":
                                mutator[key] = input.value;
                                break;
                            default:
                                // let subMutator: ƒ.Mutator = (<ƒ.General>mutator)[key];
                                let subMutator = Reflect.get(mutator, key);
                                let subMutable;
                                // subMutable = (<ƒ.General>_mutable)[key];
                                subMutable = Reflect.get(_mutable, key);
                                let subTypes = subMutable.getMutatorAttributeTypes(subMutator);
                                mutator[key] = this.updateMutator(subMutable, element, subMutator, subTypes);
                                break;
                        }
                    }
                }
            }
            return mutator;
        }
        update(_mutable, _ui) {
            let mutator = _mutable.getMutator();
            let mutatorTypes = _mutable.getMutatorAttributeTypes(mutator);
            for (let key in mutator) {
                if (this.ui.querySelector(`[name=${key}]`) != null) {
                    let type = mutatorTypes[key];
                    if (type instanceof Object) {
                        let selectElement = _ui.querySelector(`[name=${key}]`);
                        selectElement.value = mutator[key];
                    }
                    else {
                        switch (type) {
                            case "Boolean":
                                let checkbox = _ui.querySelector(`[name=${key}]`);
                                checkbox.checked = mutator[key];
                                break;
                            case "String":
                                let textfield = _ui.querySelector(`[name=${key}]`);
                                textfield.value = mutator[key];
                                break;
                            case "Number":
                                let stepper = _ui.querySelector(`[name=${key}]`);
                                if (document.activeElement != stepper) {
                                    stepper.value = mutator[key];
                                }
                                break;
                            default:
                                let fieldset = _ui.querySelector(`[name=${key}]`);
                                // tslint:disable no-any
                                let subMutable = _mutable[key];
                                this.update(subMutable, fieldset);
                                break;
                        }
                    }
                }
            }
        }
    }
    FudgeUserInterface.Mutable = Mutable;
})(FudgeUserInterface || (FudgeUserInterface = {}));
//# sourceMappingURL=FudgeUI.js.map