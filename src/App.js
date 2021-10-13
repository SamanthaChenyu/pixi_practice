import React, { useState, useEffect, useMemo, useCallback, useRef, forwardRef } from 'react';
import './App.css';
import * as PIXI from 'pixi.js'
import { Stage, Container, Sprite, PixiComponent, useApp, useTick } from '@inlet/react-pixi';
import Viewport from './Viewport';

import body from './body.png';
import backFooterRight from './backFooter_Right.png';
import forntFooterRight from './frontFooter_Right.png';
import frontFooterLeft from './frontFooter_Left.png';
import unicon from './unicon.png';
import tail from './tail.png';

const { Texture } = PIXI;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const width = 500;
const height = 500;

const BunniesContainer = ({ ...props }) => {
  const [i, setI] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);


  useTick((delta) => {
    
  function walk(i) {
    const positionY = Math.sin(i/2) * 10;
    if(positionY > 9) {
      return 9.99;
    }
      return positionY;
  }

    setI(i => i + 0.08 * delta);
    setY(walk(i));
  });

  return (
    <Container x={250} y={250} {...props}>
      
      <Sprite x={-78} y={y + 90} anchor={0.5} scale={0.5} rotation={Math.cos(i) * -0.4} image={frontFooterLeft} /> 
      <Sprite x={135} y={y + 55} anchor={0.5} scale={0.5} image={tail} />      
      <Sprite x={0} y={y} anchor={0.5} image={body} rotation={0} scale={0.5}/>
      <Sprite x={-50} y={y +-90} anchor={0.5} image={unicon} scale={0.5} />
      <Sprite x={80} y={y + 90} anchor={0.5} scale={0.5} rotation={Math.cos(i) * -0.35} image={backFooterRight} />

      <Sprite x={10} y={y + 100} anchor={0.5} scale={0.5} rotation={Math.cos(i) * 0.35} image={forntFooterRight} />

    </Container>
  );
}

const App = () => {

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0x242835 }}
      >
        <Viewport width={width} height={height}>
          <BunniesContainer scale={1} />
        </Viewport>
      </Stage>
    </>
  );
}

export default App;
