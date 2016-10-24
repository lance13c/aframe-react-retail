import 'aframe';
import Extras from 'aframe-extras';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Text from './components/Text';
import Sky from './components/Sky';

const src = require('../../point.jpg');

// Register a single component.
//AFRAME.registerComponent('a-grid', Extras.primitives);
// Register Extra Components
Extras.registerAll();

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
    // Register all add ons
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id="point" src="./point"/>
        </a-assets>
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
        </Camera>
  
        {/*Terrain*/}
        <a-grid src="point"></a-grid>

        {/*<Sky src="url(https://rawgit.com/aframevr/assets/gh-pages/360-image-gallery-boilerplate/img/sechelt.jpg)"/>*/}
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
