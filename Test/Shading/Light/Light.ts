namespace TextureTest {
    import ƒ = Fudge;

    window.addEventListener("load", init);

    function init(_event: Event): void {
        let coatRed: ƒ.CoatColored = new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1));
        let material: ƒ.Material = new ƒ.Material("Red", ƒ.ShaderFlat, coatRed);

        let body: ƒ.Node = Scenes.createCompleteMeshNode("Body", material, new ƒ.MeshPyramid());

        body.cmpTransform.translate(0, 0, 0);

        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(.1, .0, .0, 1)));
        body.addComponent(cmpLightAmbient);

        let cmpLightDirectionalRed: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 0, 0, 1)));
        body.addComponent(cmpLightDirectionalRed);

        let cmpLightDirectionalGreen: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(0, 1, 0, 1), new ƒ.Vector3(-1, 0, 0)));
        body.addComponent(cmpLightDirectionalGreen);

        let cmpLightDirectionalBlue: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(0, 0, 1, 1), new ƒ.Vector3(0, 0, -1)));
        body.addComponent(cmpLightDirectionalBlue);

        let branch: ƒ.Node = new ƒ.Node("Branch");
        branch.appendChild(body);

        ƒ.RenderManager.initialize();
        ƒ.RenderManager.addBranch(branch);
        // ƒ.RenderManager.recalculateAllNodeTransforms();

        let viewport: ƒ.Viewport = new ƒ.Viewport();
        let camera: ƒ.Node = Scenes.createCamera(new ƒ.Vector3(0, -3, 0.01), new ƒ.Vector3(0, 0, 0));
        viewport.initialize("Viewport", branch, camera.getComponent(ƒ.ComponentCamera), document.querySelector("canvas"));

        // viewport.draw();

        window.setInterval(function (): void {
            // body.cmpTransform.rotateY(-1.1);
            body.cmpTransform.rotateX(-1);
            // body.cmpTransform.rotateZ(-0.9);
            ƒ.RenderManager.update();
            viewport.draw();
        },                 20);
    }
}