import React, { Component } from 'react';
//import dirCesium from "dirCesium/Cesium";
import * as dirCesium from 'dirCesium/Cesium';
import {Viewer} from "dirCesium/Cesium";

class CesiumView extends Component {
    componentDidMount() {
            //地图初始化
          const viewer = new Viewer("cesiumContainer");
      }
    render() {
      return (
        <div id="cesiumContainer" />
      );
    }
  }


export default CesiumView;