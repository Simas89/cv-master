import React from 'react';
import { useStateSelector } from 'state';
import styled from 'styled-components';
import { ComponentType } from 'types';
import Placeholder from '../Placeholder';
import { ItemWrapper } from './';

const Div = styled.div`
  padding: 15px;
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  border: 1px solid gray;
`;

const LeftPanel = () => {
  const items = [
    { width: 5, height: 2, componentType: ComponentType.ITEM_A },
    { width: 7, height: 3, componentType: ComponentType.ITEM_B },
    { width: 10, height: 5, componentType: ComponentType.ITEM_C },
  ];
  return (
    <Div>
      <Placeholder />
      {items.map((el, idx) => (
        <ItemWrapper key={'item' + idx} item={el}>
          <span>
            {el.width}x{el.height}
          </span>
        </ItemWrapper>
      ))}
    </Div>
  );
};

export default LeftPanel;
