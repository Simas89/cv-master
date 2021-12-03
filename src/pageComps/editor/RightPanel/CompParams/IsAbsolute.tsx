import { FormControlLabel, Checkbox } from '@mui/material';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import React from 'react';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import isEqual from 'lodash.isequal';

interface IsAbsoluteProps {
  pageId: string;
  componentId: string;
}

export const IsAbsolute: React.FC<IsAbsoluteProps> = ({
  pageId,
  componentId,
}) => {
  const { isAbsolute, componentsDimensions } = useStateSelector(
    ({ inventory }) => {
      const height = inventory.pages[pageId].components[componentId].height;
      const width = inventory.pages[pageId].components[componentId].width;
      const hLocation =
        inventory.pages[pageId].components[componentId].hLocation;
      const vLocation =
        inventory.pages[pageId].components[componentId].vLocation;

      return {
        isAbsolute: inventory.pages[pageId].components[componentId].isAbsolute,
        componentsDimensions: [
          {
            height,
            width,
            hLocation,
            vLocation,
          },
        ],
      };
    },
    isEqual
  );

  const setSpace = useCreateFreeSpace();

  const { setComponent } = useActionsInventory();

  const toggleIsAbsolute = () => {
    setComponent({
      pageId,
      componentId,
      component: { isAbsolute: !isAbsolute },
    });
    setSpace({
      isFree: !isAbsolute,
      pageId,
      componentsDimensions,
    });
  };
  return (
    <div>
      <FormControlLabel
        control={<Checkbox onChange={toggleIsAbsolute} checked={isAbsolute} />}
        label='Absolute'
      />
    </div>
  );
};
