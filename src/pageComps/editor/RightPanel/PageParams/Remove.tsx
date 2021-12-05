import React from 'react';
import { useStateSelector } from 'state';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Button } from '@mui/material';
import isEqual from 'lodash.isequal';
import useActionsField from 'state/actionHooks/useActionsField';

interface RemoveProps {
  pageId: string;
}

export const Remove: React.FC<RemoveProps> = ({ pageId }) => {
  const { deleteComponentsPage } = useActionsInventory();
  const { deletePage } = useActionsField();

  const removePage = () => {
    deleteComponentsPage(pageId);
    deletePage(pageId);
  };

  return (
    <Button onClick={removePage} size='small' color='error' variant='outlined'>
      Delete
    </Button>
  );
};
