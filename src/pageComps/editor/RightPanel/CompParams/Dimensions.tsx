import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Button } from '@mui/material';
import isEqual from 'lodash.isequal';
import { itemsData } from 'config/itemsData';
import { H_BLOCKS, V_BLOCKS } from 'state/reducers/field';

const Div = styled.div``;

interface DimensionsProps {
  pageId: string;
  componentId: string;
}

export const Dimensions: React.FC<DimensionsProps> = ({
  pageId,
  componentId,
}) => {
  const {
    componentType,
    width,
    height,
    hLocation,
    vLocation,
    isFreeRight,
    isFreeBottom,
  } = useStateSelector(({ inventory, field }) => {
    const componentType =
      inventory.pages[pageId].components[componentId].componentType;
    const width =
      inventory.pages[pageId].components[componentId].dimensions.width;
    const height =
      inventory.pages[pageId].components[componentId].dimensions.height;
    const hLocation =
      inventory.pages[pageId].components[componentId].dimensions.hLocation;
    const vLocation =
      inventory.pages[pageId].components[componentId].dimensions.vLocation;

    let isFreeRight = true;
    let isFreeBottom = true;
    for (let i = 0; i < H_BLOCKS; i++) {
      for (let j = 0; j < V_BLOCKS; j++) {
        const conditionHorH = i === hLocation + width;
        const conditionHorV = j - vLocation < height && j >= vLocation;
        const conditionVerH = i - hLocation < width && i >= hLocation;
        const conditionVerV = j === vLocation + height;
        const isFree = field.pages[pageId].field[i][j].isFree;

        if (conditionHorH && conditionHorV && !isFree) {
          isFreeRight = false;
        }
        if (conditionVerH && conditionVerV && !isFree) {
          isFreeBottom = false;
        }
      }
    }

    return {
      componentType,
      width,
      height,
      hLocation,
      vLocation,
      isFreeRight,
      isFreeBottom,
    };
  }, isEqual);

  const MIN_WIDTH = itemsData[componentType].dimensions.MIN_WIDTH;
  const MAX_WIDTH = itemsData[componentType].dimensions.MAX_WIDTH;
  const MIN_HEIGHT = itemsData[componentType].dimensions.MIN_HEIGHT;
  const MAX_HEIGHT = itemsData[componentType].dimensions.MAX_HEIGHT;

  const { setComponentDimensions } = useActionsInventory();

  const setWidth = (index: number) => {
    setComponentDimensions({
      pageId,
      componentId,
      dimensions: { width: width + index },
    });
  };

  const setHeight = (index: number) => {
    setComponentDimensions({
      pageId,
      componentId,
      dimensions: { height: height + index },
    });
  };

  const conditionMinWidth = width <= MIN_WIDTH;
  const conditionMaxWidth =
    hLocation + width >= H_BLOCKS || width >= MAX_WIDTH || !isFreeRight;
  const conditionMinHeight = height <= MIN_HEIGHT;
  const conditionMaxHeight =
    vLocation + height >= V_BLOCKS || height >= MAX_HEIGHT || !isFreeBottom;

  return (
    <Div>
      Width {width}{' '}
      <Button
        onClick={() => setWidth(-1)}
        size='small'
        variant='outlined'
        disabled={conditionMinWidth}
      >
        -
      </Button>
      <Button
        onClick={() => setWidth(1)}
        size='small'
        variant='outlined'
        disabled={conditionMaxWidth}
      >
        +
      </Button>
      <br />
      Height {height}{' '}
      <Button
        onClick={() => setHeight(-1)}
        size='small'
        variant='outlined'
        disabled={conditionMinHeight}
      >
        -
      </Button>
      <Button
        onClick={() => setHeight(1)}
        size='small'
        variant='outlined'
        disabled={conditionMaxHeight}
      >
        +
      </Button>
    </Div>
  );
};
