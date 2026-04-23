import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, DirectionalLight, Color4 } from '@babylonjs/core';
import { createRoseMesh, createStemMesh, createLeafMesh } from './rose-geometry';

export class RoseScene {
  constructor(canvas) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);

    this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0.5, 0), this.scene);
    this.camera.attachControl(canvas, true);
    this.camera.wheelPrecision = 50;
    this.camera.lowerRadiusLimit = 1;
    this.camera.upperRadiusLimit = 10;

    this.light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    this.light.intensity = 0.7;

    this.dirLight = new DirectionalLight("dirLight", new Vector3(-1, -2, -1), this.scene);
    this.dirLight.position = new Vector3(5, 10, 5);
    this.dirLight.intensity = 0.5;

    this.roseMesh = null;
    this.stemMesh = createStemMesh(this.scene, 1.5);
    this.leaf1 = createLeafMesh(this.scene, 1, -0.7);
    this.leaf2 = createLeafMesh(this.scene, -1, -1.4);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  updateRose(params) {
    if (this.roseMesh) {
      this.roseMesh.dispose();
    }
    this.roseMesh = createRoseMesh(this.scene, params);
  }

  dispose() {
    this.engine.dispose();
  }
}
