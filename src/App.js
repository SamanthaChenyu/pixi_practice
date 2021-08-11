import React, { useState, useEffect, useMemo, useCallback, useRef, forwardRef } from 'react';
import './App.css';
import * as PIXI from 'pixi.js'
import { Stage, Container, Sprite, PixiComponent, useApp, useTick } from '@inlet/react-pixi';
import Viewport from './Viewport';

import body from './body.png';
import backFooter_Right from './backFooter_Right.png';
import forntFooterRight from './frontFooter_Right.png';

const { Texture } = PIXI;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const width = 500;
const height = 500;

const useIteration = (incr = 1) => {
  const [i, setI] = React.useState(0);
  
  useTick((delta) => {
    setI(i => i + incr * delta);
  });

  return i;
};

const Bunny = forwardRef((props, ref, rotation, img) => {
  // abstracted away, see settings>js
  const i = useIteration(0.1);
  return (
    <Sprite
      ref={ref}
      image={forntFooterRight}
      anchor={0.5}
      scale={0.5}
      rotation={rotation}
      {...props}
    />
  );
});

const BunniesContainer = ({ ...props }) => {
  const i = useIteration(0.08);
  return (
    <Container x={250} y={250} {...props}>
      
      
      <Sprite x={-145.25} y={-108} image={body} rotation={0} scale={0.5}/>

      <Sprite x={80} y={89} anchor={0.5} scale={0.5} rotation={Math.cos(i) * -0.35} image={backFooter_Right} />
     {/* frontFooter(left) */}
      <Sprite x={10} y={100} anchor={0.5} scale={0.5} rotation={Math.cos(i) * 0.35} image={forntFooterRight} />
      {/* frontFooter(Right) */}
    </Container>
  );
}

const App = () => {

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0x1099bb }}
      >
        <Viewport width={width} height={height}>
          <BunniesContainer scale={1} />
        </Viewport>
      </Stage>
    </>
  );
}

export default App;
