import React from 'react';
import { ComponentType } from 'types';
import { keyGen } from 'util/generateId';
import { ItemWrapper } from '.';

const items = [
  { width: 5, height: 2, componentType: ComponentType.ITEM_A },
  { width: 7, height: 3, componentType: ComponentType.ITEM_B },
  { width: 10, height: 5, componentType: ComponentType.ITEM_C },
];

const Library = () => {
  return (
    <>
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
