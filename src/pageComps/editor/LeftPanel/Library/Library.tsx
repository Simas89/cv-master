import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useStateSelector } from 'state';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { ItemWrapper } from '.';
import { itemsData } from 'config/itemsData';

const itemsArr = Object.keys(itemsData).map((el) => {
  return {
    componentType: itemsData[el].componentType,
    dimensions: {
      width: itemsData[el].dimensions.width,
      height: itemsData[el].dimensions.height,
    },
  };
});

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
      {itemsArr.map((el, idx) => (
        <ItemWrapper key={'item' + idx} item={el}>
          <span>
            {el.dimensions.width}x{el.dimensions.height} : {el.componentType}
          </span>
        </ItemWrapper>
      ))}
    </>
  );
};

export default Library;
