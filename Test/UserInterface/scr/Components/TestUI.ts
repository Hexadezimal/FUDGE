/// <reference path="../../../../Core/Build/Fudge.d.ts"/>
/// <reference path="../../../../UserInterface/Build/FudgeUI.d.ts"/>

namespace UI {
    import ƒ = Fudge;
    import ƒui = FudgeUserInterface;
    export class TestUI extends ƒui.UIMutable {
        protected root: HTMLFormElement;
        private camera: ƒ.ComponentCamera;

        public constructor(container: GoldenLayout.Container, state: Object, _camera: ƒ.ComponentCamera) {
            super(_camera);
            this.camera = _camera;
            this.root = document.createElement("form");
            let testdiv: HTMLElement = document.createElement("div");
            let toggleButton: ƒui.ToggleButton = new ƒui.ToggleButton();
            testdiv.append(toggleButton);
            testdiv.innerHTML = "I was created manually";
            this.root.append(testdiv);
            ƒui.UIGenerator.createFromMutable(<ƒ.Mutable>_camera, this.root);
            this.root.addEventListener("input", this.mutateOnInput);
            container.getElement().html(this.root);
        }
    }
}