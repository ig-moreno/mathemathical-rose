import { Vector3, Color3, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import { calculateRosePoint } from './math';

export function createRoseMesh(scene, params) {
  const { nu, nv } = params;
  const paths = [];

  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    const path = [];
    for (let i = 0; i <= nu; i++) {
      const u = (i / nu) * Math.PI * 2;
      const point = calculateRosePoint(u, v, params);
      path.push(new Vector3(point.x, point.y, point.z));
    }
    paths.push(path);
  }

  const rose = MeshBuilder.CreateRibbon("rose", { 
    pathArray: paths, 
    sideOrientation: MeshBuilder.DOUBLESIDE,
    updatable: true 
  }, scene);

  const roseMat = new StandardMaterial("roseMat", scene);
  roseMat.diffuseColor = new Color3(0.8, 0.1, 0.2);
  roseMat.specularColor = new Color3(0.3, 0.3, 0.3);
  roseMat.backFaceCulling = false;
  rose.material = roseMat;

  return rose;
}

export function createStemMesh(scene, h_total) {
  const points = [];
  const heightSegments = 30;
  const stemLength = 3.0;
  
  for (let i = 0; i <= heightSegments; i++) {
    const v = i / heightSegments;
    // Stem goes from y = 0.1 (inside the rose base) down to y = -stemLength
    const y = 0.1 - (stemLength * v);
    // Organic curve that starts at (0,0) for v=0
    const x = 0.12 * Math.sin(v * Math.PI * 0.6);
    const z = 0.12 * (Math.cos(v * Math.PI * 0.6) - 1); 
    points.push(new Vector3(x, y, z));
  }

  const stem = MeshBuilder.CreateTube("stem", {
    path: points,
    radius: 0.04,
    tessellation: 12,
    sideOrientation: MeshBuilder.DOUBLESIDE
  }, scene);

  const stemMat = new StandardMaterial("stemMat", scene);
  stemMat.diffuseColor = new Color3(0.15, 0.4, 0.05);
  stemMat.backFaceCulling = false;
  stem.material = stemMat;

  return stem;
}

export function createLeafMesh(scene, side = 1, heightOffset = -0.8) {
  const nu = 10;
  const nv = 10;
  const paths = [];

  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    const path = [];
    for (let i = 0; i <= nu; i++) {
      const u = i / nu;
      const length = 0.7;
      const width = 0.35 * Math.sin(Math.PI * v);
      
      const px = side * (v * length);
      const pz = width * (u - 0.5) * 2;
      const py = 0.15 * Math.sin(Math.PI * v) + heightOffset; 
      
      path.push(new Vector3(px, py, pz));
    }
    paths.push(path);
  }

  const leaf = MeshBuilder.CreateRibbon("leaf", { 
    pathArray: paths, 
    sideOrientation: MeshBuilder.DOUBLESIDE 
  }, scene);

  const leafMat = new StandardMaterial("leafMat", scene);
  leafMat.diffuseColor = new Color3(0.2, 0.5, 0.1);
  leafMat.backFaceCulling = false;
  leaf.material = leafMat;

  leaf.rotation.y = side * 0.4;
  leaf.rotation.z = side * 0.3;

  return leaf;
}
