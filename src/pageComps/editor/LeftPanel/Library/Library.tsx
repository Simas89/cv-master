import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { ComponentType } from 'types';
import { keyGen } from 'util/generateId';
import { ItemWrapper } from '.';

const items = [
  { width: 5, height: 2, componentType: ComponentType.ITEM_A },
  { width: 7, height: 3, componentType: ComponentType.ITEM_B },
  { width: 10, height: 5, componentType: ComponentType.ITEM_C },
];

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
      {items.map((el) => (
        <ItemWrapper key={keyGen()} item={el}>
          <span>
            {el.width}x{el.height} : {el.componentType}
          </span>
        </ItemWrapper>
      ))}
    </>
  );
};

export default Library;
