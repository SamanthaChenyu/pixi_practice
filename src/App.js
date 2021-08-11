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
      scale={0.2}
      rotation={rotation}
      {...props}
    />
  );
});

const BunniesContainer = ({ ...props }) => {
  const i = useIteration(0.08);
  return (
    <Container x={250} y={250} {...props}>
      <Bunny x={-50} y={-50} rotation={Math.cos(i) * -0.4} />
      <Bunny x={50} y={-50} rotation={Math.cos(i) * 0.4} img={backFooter_Right} />
      <Sprite x={0} y={0} scale={0.2} image={body} rotation={0} />
     <Bunny x={-50} y={50} rotation={Math.cos(i) * -0.4} />
     {/* frontFooter(left) */}
      <Bunny x={50} y={10} rotation={Math.cos(i) * 0.4} img={forntFooterRight} />
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
          <BunniesContainer scale={2} />
        </Viewport>
      </Stage>
    </>
  );
}

export default App;
