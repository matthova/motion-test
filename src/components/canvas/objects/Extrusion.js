import React, { Component } from 'react';
import * as THREE from 'three';

export default class Extrusion extends Component {
  render() {
    const extrudeSettings = {
      amount: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const x = 0;
    const y = 0;
    const z = 0;
    const rotation = new THREE.Euler(0, 0, 0);
    const scale = new THREE.Vector3(1, 1, 1);

    const verticies = [];
    verticies.push(new THREE.Vector2(0, 0));
    verticies.push(new THREE.Vector2(10, 0));
    verticies.push(new THREE.Vector2(0, 10));

    return (
      <mesh
        // 3d shape
        position={new THREE.Vector3(x, y, z - 75)}
        rotation={rotation}
        scale={scale}
      >
        <extrudeGeometry
          settings={extrudeSettings}
        >
          <shape points={verticies}/>
        </extrudeGeometry>
        <meshBasicMaterial
          color={0xff0000}
        />
      </mesh>
    );
  }
};
