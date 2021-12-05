import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
// import { ComponentType } from 'types';
import { ItemWrapper } from '.';

export enum ComponentType {
  ITEM_A = 'ITEM_A',
  ITEM_B = 'ITEM_B',
  ITEM_C = 'ITEM_C',
}

const items = [
  ComponentType.ITEM_A,
  ComponentType.ITEM_B,
  ComponentType.ITEM_C,
];

const itemsData = {
  ITEM_A: {
    componentType: ComponentType.ITEM_A,
    dimensions: { width: 5, height: 2 },
  },
  ITEM_B: {
    componentType: ComponentType.ITEM_B,
    dimensions: { width: 7, height: 3 },
  },
  ITEM_C: {
    componentType: ComponentType.ITEM_C,
    dimensions: { width: 10, height: 5 },
  },
};

const Library = () => {
  const isCreateAbsolute = useStateSelector(
    ({ inventory }) => inventory.isCreateAbsolute
  );

  const { setIsCreateAbsolute } = useActionsInventory();

  const toggleCreateAbsolute = () => {
    setIsCreateAbsolute(!isCreateAbsolute);
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            onChange={toggleCreateAbsolute}
            checked={isCreateAbsolute}
          />
        }
        label='Create absolute'
      />
      {items.map((el, idx) => (
        <ItemWrapper key={'item' + idx} item={itemsData[el]}>
          <span>
            {itemsData[el].dimensions.width}x{itemsData[el].dimensions.height} :{' '}
            {itemsData[el].componentType}
          </span>
        </ItemWrapper>
      ))}
    </>
  );
};

export default Library;
