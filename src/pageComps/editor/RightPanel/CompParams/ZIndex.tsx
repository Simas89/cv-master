import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Button } from '@mui/material';
import isEqual from 'lodash.isequal';

const Div = styled.div``;

interface ZIndexProps {
  pageId: string;
  componentId: string;
}

export const ZIndex: React.FC<ZIndexProps> = ({ pageId, componentId }) => {
  const zIndex = useStateSelector(
    ({ inventory }) => inventory.pages[pageId].components[componentId].zIndex,
    isEqual
  );

  const { setComponent } = useActionsInventory();

  const setZIndex = (index: number) => {
    setComponent({
      pageId,
      componentId,
      component: { zIndex: zIndex + index },
    });
  };

  return (
    <Div>
      Z-index {zIndex}{' '}
      <Button
        onClick={() => setZIndex(-1)}
        size='small'
        variant='outlined'
        disabled={zIndex < 1}
      >
        -
      </Button>
      <Button
        onClick={() => setZIndex(1)}
        size='small'
        variant='outlined'
        disabled={zIndex > 19}
      >
        +
      </Button>
    </Div>
  );
};
