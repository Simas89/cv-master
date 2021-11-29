import React from 'react';
import styled, { css } from 'styled-components';
import { useStateSelector } from 'state';
import { flexCenter } from 'common/css';
import { keyGen } from 'util/generateId';
import isEqual from 'lodash.isequal';
import useActionsInventory from 'state/actionHooks/useActionsInventory';

const CompListDiv = styled.div`
  /* border: 1px solid red; */
  margin: 10px 0;
`;

const ItemDiv = styled.div<{ isSelected: boolean }>`
  border: 1px solid black;
  margin-bottom: 5px;
  padding: 10px 0;
  cursor: pointer;
  ${flexCenter()};
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: lightgreen;
    `}
`;

interface CompListProps {
  pageId: string;
}

export const CompList: React.FC<CompListProps> = ({ pageId }) => {
  const { components, selectedComponent } = useStateSelector(
    ({ inventory }) => {
      const comps = inventory.pages[pageId].components;
      return {
        selectedComponent: inventory.selectedComponent,
        components: Object.keys(comps)
          .map((k) => {
            return {
              componentType: comps[k].componentType,
              timeStamp: comps[k].timeStamp,
              componentId: k,
            };
          })
          .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)),
      };
    },
    isEqual
  );

  const { setSelectedComponent } = useActionsInventory();

  const selectComponent = (componentId: string) => {
    setSelectedComponent({ pageId, componentId });
  };

  const checkIfSelected = (componentId: string) => {
    if (
      componentId === selectedComponent.componentId &&
      pageId === selectedComponent.pageId
    )
      return true;
    return false;
  };
  return (
    <CompListDiv>
      {components.map((el, idx) => (
        <ItemDiv
          onClick={() => selectComponent(el.componentId)}
          key={keyGen()}
          isSelected={checkIfSelected(el.componentId)}
        >
          {el.componentType}
        </ItemDiv>
      ))}
    </CompListDiv>
  );
};
