import { Button } from '@mui/material';
import React from 'react';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
`;

export const MovePage: React.FC<{ pageId: string }> = ({ pageId }) => {
  const { pageOrder, totalPages } = useStateSelector(({ inventory }) => {
    return {
      pageOrder: inventory.pages[pageId].order,
      totalPages: Object.keys(inventory.pages).length,
    };
  });

  console.log(totalPages);

  const { swapPage } = useActionsInventory();

  console.log(pageOrder);
  return (
    <Div>
      Move
      <Button
        variant='contained'
        size='small'
        disabled={pageOrder < 2}
        onClick={() => swapPage({ id: pageId, direction: 'UP' })}
      >
        up
      </Button>
      <Button
        variant='contained'
        size='small'
        disabled={!(pageOrder < totalPages)}
        onClick={() => swapPage({ id: pageId, direction: 'DOWN' })}
      >
        down
      </Button>
    </Div>
  );
};
