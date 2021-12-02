import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import { Remove } from './Remove';

const Div = styled.div``;

const CompParams = () => {
  const { pageId, componentId } = useStateSelector(
    ({ inventory }) => inventory.selectedComponent
  );

  if (!componentId) return null;
  return (
    <Div>
      <Remove pageId={pageId} componentId={componentId} />
    </Div>
  );
};

export default CompParams;
