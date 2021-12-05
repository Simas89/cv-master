import React from 'react';
import { H_BLOCKS } from 'state/reducers/field';
import styled from 'styled-components';
import { Block } from '.';

const RowDiv = styled.div`
  display: flex;
`;

interface RowProps {
  vBlock: number;
  pageId: string;
}

export const Row = React.memo<RowProps>(({ vBlock, pageId }) => {
  return (
    <RowDiv>
      {Array.apply(null, Array(H_BLOCKS)).map((_, idx) => (
        <Block
          key={'iKey' + idx + vBlock}
          vBlock={vBlock}
          hBlock={idx}
          pageId={pageId}
        />
      ))}
    </RowDiv>
  );
});

Row.displayName = 'Row';
