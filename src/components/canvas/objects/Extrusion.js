import React, { Component } from 'react';
import * as THREE from 'three';
import { gcodeToObject } from 'gcode-json-converter';

import gcode from './gcode';
export default class Extrusion extends Component {

  // naïve implementation of extrusion profile
  createExtrusionProfile() {
    const extrusionWidth = 0.4;
    const layerHeight = 0.3;
    const verticies = [];
    verticies.push(new THREE.Vector2(-extrusionWidth / 2, layerHeight / 2));
    verticies.push(new THREE.Vector2(-extrusionWidth / 2 + layerHeight / 2, layerHeight));
    verticies.push(new THREE.Vector2(extrusionWidth / 2 - layerHeight / 2, layerHeight));
    verticies.push(new THREE.Vector2(extrusionWidth / 2, layerHeight / 2));
    verticies.push(new THREE.Vector2(extrusionWidth / 2 - layerHeight / 2, 0));
    verticies.push(new THREE.Vector2(-extrusionWidth/2 + layerHeight / 2, 0));
    return verticies;
  }

  render() {
    const gcodeArray = gcode.split('\n');
    const objects = gcodeArray.map(gcode => gcodeToObject(gcode));

    const currentPosition = {
      x: 0,
      y: 0,
      z: 0
    };

    let lastPoint = new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z);

    const extrusions = [];
    objects.forEach((gcode, i) => {
      let start;
      let end;
      let path;
      if (gcode.args.e != undefined) {
        path = new THREE.CurvePath();
        start = Object.assign({}, lastPoint);
      }

      currentPosition.x = objects[i].args.x || currentPosition.x;
      currentPosition.y = objects[i].args.y || currentPosition.y;
      currentPosition.z = objects[i].args.z || currentPosition.z;
      lastPoint = new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z);

      if (gcode.args.e != undefined) {
        const line = new THREE.LineCurve3(start, lastPoint);
        path.add(line);
        const extrudeSettings = {
          amount: 8,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 2,
          bevelSize: 1,
          bevelThickness: 1,
          extrudePath: path,
        };
        extrusions.push(
          <mesh key={i} rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}>
            <extrudeGeometry settings={extrudeSettings}>
              <shape points={this.createExtrusionProfile()} />
            </extrudeGeometry>
            <meshPhongMaterial color={0xff0000} />
          </mesh>
        );
      }
    });

    return (
      <group>
        {extrusions}
      </group>
    );
  }
};
