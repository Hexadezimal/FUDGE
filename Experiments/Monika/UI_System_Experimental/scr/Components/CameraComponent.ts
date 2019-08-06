/// <reference path="../../../../../Core/build/Fudge.d.ts"/>
/// <reference path="../UI/MutableUI.ts"/>

namespace UI {
    import ƒ = Fudge;
    export class CameraUI extends MutableUI {
        private camera: ƒ.ComponentCamera
        protected root: HTMLFormElement;
        public constructor(container: any, state: any, _camera: ƒ.ComponentCamera) {
            super(_camera);
            this.camera = _camera;
            this.root = document.createElement("form");
            UIGenerator.createFromMutator(<ƒ.Mutable>_camera, this.root);
            this.root.addEventListener("input", this.updateUI);
            container.getElement().html(this.root);
        }
        protected updateUI = (_event: Event) => {
            let target: HTMLInputElement = <HTMLInputElement>_event.target;
            this.mutator = this.mutable.getMutator();
            let formData: FormData = new FormData(this.root);
            // this.fillById(this.mutator);
            if (target.type == "checkbox") {
                this.mutator[target.id] = target.checked;
            }
            else {
                for (let entry of formData) {
                    if (entry[0] == target.id) {
                        this.mutator[entry[0]] = entry[1];
                    }
                }
            }

            this.mutable.mutate(this.mutator);
        }
    }
}