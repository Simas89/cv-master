import React from 'react';
import { useStateSelector } from 'state';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Button } from '@mui/material';
import isEqual from 'lodash.isequal';

interface RemoveProps {
  pageId: string;
  componentId: string;
}

export const Remove: React.FC<RemoveProps> = ({ pageId, componentId }) => {
  const componentsDimensions = useStateSelector(({ inventory }) => {
    const comp = inventory.pages[pageId].components[componentId];
    return [
      {
        height: comp.height,
        width: comp.width,
        hLocation: comp.hLocation,
        vLocation: comp.vLocation,
      },
    ];
  }, isEqual);

  const setSpace = useCreateFreeSpace();
  const { deleteComponent, setSelectedComponent } = useActionsInventory();

  const removeComponent = () => {
    setSpace({ isFree: true, pageId, componentsDimensions });
    deleteComponent({ pageId, componentId });
    setSelectedComponent({ pageId: '', componentId: '' });
  };

  return (
    <Button
      onClick={removeComponent}
      size='small'
      color='error'
      variant='outlined'
    >
      Delete
    </Button>
  );
};
