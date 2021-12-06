import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Button } from '@mui/material';
import isEqual from 'lodash.isequal';

const Div = styled.div``;

interface DimensionsProps {
  pageId: string;
  componentId: string;
}

export const Dimensions: React.FC<DimensionsProps> = ({
  pageId,
  componentId,
}) => {
  const width = useStateSelector(
    ({ inventory }) => inventory.pages[pageId].components[componentId].width,
    isEqual
  );

  const { setComponent } = useActionsInventory();

  const setWidth = (index: number) => {
    setComponent({
      pageId,
      componentId,
      component: { width: width + index },
    });
  };

  return (
    <Div>
      Width {width}{' '}
      <Button
        onClick={() => setWidth(-1)}
        size='small'
        variant='outlined'
        disabled={width < 1}
      >
        -
      </Button>
      <Button
        onClick={() => setWidth(1)}
        size='small'
        variant='outlined'
        disabled={width > 9}
      >
        +
      </Button>
    </Div>
  );
};
