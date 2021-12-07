import { FormControlLabel, Checkbox } from '@mui/material';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import React from 'react';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import isEqual from 'lodash.isequal';
import { H_BLOCKS, V_BLOCKS } from 'state/reducers/field';

interface IsAbsoluteProps {
  pageId: string;
  componentId: string;
}

export const IsAbsolute: React.FC<IsAbsoluteProps> = ({
  pageId,
  componentId,
}) => {
  const { isAbsolute, isOn, isAreaFree, componentsDimensions } =
    useStateSelector(({ inventory, field }) => {
      const comp = inventory.pages[pageId].components[componentId];
      const height = comp.dimensions.height;
      const width = comp.dimensions.width;
      const hLocation = comp.dimensions.hLocation;
      const vLocation = comp.dimensions.vLocation;

      const isAbsolute =
        inventory.pages[pageId].components[componentId].dimensions.isAbsolute;
      const isOn = field.modifyMode.isOn;

      let isAreaFree: boolean = true;

      for (let i = 0; i < H_BLOCKS; i++) {
        for (let j = 0; j < V_BLOCKS; j++) {
          const conditionHor = i - hLocation < width && i >= hLocation;
          const conditionVer = j - vLocation < height && j >= vLocation;
          const isFree = field.pages[pageId].field[i][j].isFree;

          if (conditionHor && conditionVer && !isFree) {
            isAreaFree = false;
          }
        }
      }

      return {
        componentsDimensions: [
          {
            height,
            width,
            hLocation,
            vLocation,
          },
        ],
        isAbsolute,
        isOn,
        isAreaFree,
      };
    }, isEqual);

  const setSpace = useCreateFreeSpace();

  const { setComponentDimensions } = useActionsInventory();

  const toggleIsAbsolute = () => {
    setComponentDimensions({
      pageId,
      componentId,
      dimensions: { isAbsolute: !isAbsolute },
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
        control={
          <Checkbox
            onChange={toggleIsAbsolute}
            checked={isAbsolute}
            disabled={!isAreaFree && isAbsolute && !isOn}
          />
        }
        label='Absolute'
      />
    </div>
  );
};
