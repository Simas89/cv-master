import React from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import { Remove, PrintPage } from '.';

const Div = styled.div``;

const PageParams = () => {
  const pageId = useStateSelector(
    ({ inventory }) => inventory.selectedComponent.pageId
  );

  console.log('pageId', pageId);

  if (!pageId) return null;
  return (
    <Div>
      <Remove pageId={pageId} />
      <PrintPage pageId={pageId} />
    </Div>
  );
};

export default PageParams;
