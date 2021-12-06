import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import { Remove, IsAbsolute, ZIndex, Dimensions } from '.';

const Div = styled.div``;

const CompParams = () => {
  const { pageId, componentId } = useStateSelector(
    ({ inventory }) => inventory.selectedComponent
  );

  if (!componentId) return null;
  return (
    <Div>
      <IsAbsolute pageId={pageId} componentId={componentId} />
      <ZIndex pageId={pageId} componentId={componentId} />
      <Dimensions pageId={pageId} componentId={componentId} />
      <Remove pageId={pageId} componentId={componentId} />
    </Div>
  );
};

export default CompParams;
