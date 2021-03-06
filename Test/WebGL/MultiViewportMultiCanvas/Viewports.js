var RenderManagerRendering;
(function (RenderManagerRendering) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    function init() {
        // create asset
        let branch = Scenes.createAxisCross();
        branch.addComponent(new ƒ.ComponentTransform());
        // initialize viewports
        let posCameras = [new ƒ.Vector3(0.1, 0, 5), new ƒ.Vector3(0.1, 5, 0), new ƒ.Vector3(5, 0.1, 0), new ƒ.Vector3(3, 3, 5)];
        let canvasList = document.getElementsByTagName("canvas");
        let viewPorts = [];
        for (let i = 0; i < canvasList.length; i++) {
            let cmpCamera = Scenes.createCamera(posCameras[i]);
            cmpCamera.projectCentral(1, 45);
            let viewPort = new ƒ.Viewport();
            viewPort.initialize(canvasList[i].id, branch, cmpCamera, canvasList[i]);
            viewPorts.push(viewPort);
        }
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, animate);
        ƒ.Loop.start();
        function animate(_event) {
            branch.mtxLocal.rotateY(1);
            // prepare and draw viewport
            for (let viewPort of viewPorts) {
                //viewPort.prepare();
                viewPort.draw();
            }
        }
    }
})(RenderManagerRendering || (RenderManagerRendering = {}));
//# sourceMappingURL=Viewports.js.map