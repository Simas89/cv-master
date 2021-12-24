import React from 'react';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Button } from '@mui/material';

interface RemoveProps {
  pageId: string;
  componentId: string;
}

export const Remove: React.FC<RemoveProps> = ({ pageId, componentId }) => {
  const { deleteComponent, setSelectedComponent } = useActionsInventory();

  const removeComponent = () => {
    deleteComponent({ pageId, componentId });
    setSelectedComponent({ pageId, componentId: '' });
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
