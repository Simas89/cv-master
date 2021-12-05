import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useStateSelector } from 'state';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useResizeDetector } from 'react-resize-detector';
import Row from './Row';
import FieldGrid from './FieldGrid';
import useGameOfLife from 'hooks/useGameOfLife';
import useActionsGameOfLife from 'state/actionHooks/useActionsGameOfLife';
import { flexCenter } from 'common/css';

const FieldDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  ${flexCenter()};

  .window {
    position: relative;
    /* transform: perspective(400px) rotateY(5deg) rotateX(5deg) rotateZ(-5deg)
      scale(1.5); */
  }
  /* .white-gradient {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    pointer-events: none;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(251, 253, 254, 1) 32%,
      rgba(171, 240, 254, 0.03125) 76%,
      rgba(0, 212, 255, 0) 100%
    );
  } */
`;

const getNumber = (input: any) => {
  if (typeof input === 'number') return input;
  else return 0;
};

const densitySelector = (input: number | undefined) => {
  const x = getNumber(input);
  if (x < 600) return 30;
  else if (x < 1000) return 40;
  else if (x < 1700) return 50;
  else return 60;
};

const GameWindow = () => {
  const [drawHBlocks, setDrawHBlocks] = useState(60);
  const hBlocks = useStateSelector(({ gameOfLife }) => gameOfLife.value.length);
  const vBlocks = useStateSelector(
    ({ gameOfLife }) => gameOfLife.value[0].length
  );
  const blockSize = useStateSelector(({ gameOfLife }) => gameOfLife.blockSize);
  const [canDraw, setCanDraw] = useState(false);
  const { width, height, ref } = useResizeDetector();

  const { setHorizontalBlocks, setVerticalBlocks, setBlockSize } =
    useActionsGameOfLife();

  useIsomorphicLayoutEffect(() => {
    const newBlockSize = Math.ceil(getNumber(width) / drawHBlocks);
    const totalVBlocks = Math.ceil(getNumber(height) / newBlockSize);

    setDrawHBlocks(densitySelector(getNumber(width)));

    setBlockSize(newBlockSize);
    setHorizontalBlocks(drawHBlocks);
    setVerticalBlocks(totalVBlocks);
  }, [
    setVerticalBlocks,
    setHorizontalBlocks,
    blockSize,
    width,
    height,
    drawHBlocks,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanDraw(true);
      clearTimeout(timer);
    });
  }, [setCanDraw]);

  useGameOfLife();

  return (
    <FieldDiv ref={ref}>
      <div className='window'>
        <FieldGrid />
        {canDraw &&
          Array.apply(null, Array(vBlocks)).map((_, idx) => (
            <Row key={'rKey' + idx} length={hBlocks} vBlock={idx} />
          ))}
      </div>
      <div className='white-gradient' />
    </FieldDiv>
  );
};

export default GameWindow;
