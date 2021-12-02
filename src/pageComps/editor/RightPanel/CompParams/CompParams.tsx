import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import { Remove, IsAbsolute } from '.';

const Div = styled.div``;

const CompParams = () => {
  const { pageId, componentId } = useStateSelector(
    ({ inventory }) => inventory.selectedComponent
  );

  if (!componentId) return null;
  return (
    <Div>
      <Remove pageId={pageId} componentId={componentId} />
      <IsAbsolute pageId={pageId} componentId={componentId} />
    </Div>
  );
};

export default CompParams;
