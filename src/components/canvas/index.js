import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import Extrusion from './objects/Extrusion';

const OrbitControls = require('three-orbit-controls')(THREE);

class Canvas extends Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 20);

    this._onAnimate = () => {
      // we will get this callback every frame
    };
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
        width={width}
        height={height}
        onAnimate={this._onAnimate}
        antialias
        pixelRatio={window.devicePixelRatio}
        clearColor={0xf0f0f0}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            ref="camera"
            fov={50}
            aspect={width / height}
            near={.1}
            far={1000}
            position={this.cameraPosition}
          >
            <pointLight
              color={0xffffff}
              intensity={0.5}
            />
          </perspectiveCamera>
          <Extrusion/>
          <gridHelper size={100}/>
        </scene>
      </React3>
    );
  }
}

export default Canvas;
