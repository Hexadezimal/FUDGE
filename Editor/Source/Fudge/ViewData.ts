///<reference types="../../../Core/Build/FudgeCore"/>
//<reference types="../../Examples/Code/Scenes"/>
///<reference path="View.ts"/>

namespace Fudge {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;
    /**
     * View displaying all information of any selected entity and offering simple controls for manipulation
     */
    export class ViewData extends View {
        private data: ƒ.Node | ƒ.Mutable;
        // TODO: adept view to selected object, update when selection changes etc.
        constructor(_parent: Panel) {
            super(_parent);
            this.parentPanel.addEventListener(ƒui.UIEVENT.SELECTION, this.setNode);
            this.fillContent();
        }
        deconstruct(): void {
            //TODO: Deconstruct;
        }
        fillContent(): void {
            if (this.data) {
                let cntHeader: HTMLElement = document.createElement("span");
                let lblNodeName: HTMLElement = document.createElement("label");
                lblNodeName.textContent = "Name";
                cntHeader.append(lblNodeName);
                this.content.append(cntHeader);
                let cntComponents: HTMLDivElement = document.createElement("div");


                if (this.data instanceof ƒ.Node) {
                    let txtNodeName: HTMLInputElement = document.createElement("input");
                    txtNodeName.addEventListener("input", this.changeNodeName);
                    txtNodeName.value = this.data.name;
                    cntHeader.append(txtNodeName);
                    let nodeComponents: ƒ.Component[] = this.data.getAllComponents();
                    for (let nodeComponent of nodeComponents) {
                        let uiComponents: ƒui.UINodeData = new ƒui.UINodeData(nodeComponent, this.content);
                    }
                }

            }
            else {
                let cntEmpty: HTMLDivElement = document.createElement("div");
                this.content.append(cntEmpty);
            }
        }
        private changeNodeName = (_event: Event) => {
            if (this.data instanceof ƒ.Node) {
                let target: HTMLInputElement = <HTMLInputElement>_event.target;
                this.data.name = target.value;
            }
        }

        private setNode = (_event: CustomEvent): void => {
            this.data = _event.detail;
            while (this.content.firstChild != null) {
                this.content.removeChild(this.content.lastChild);
            }
            this.fillContent();
        }
    }
}