import React, { RefObject } from 'react';
import styled, { css } from 'styled-components';
import { useStateSelector } from 'state';
import { V_BLOCKS } from 'state/reducers/field';
import { FieldGrid, Row } from '.';
import { flexCenter } from 'common/css';
import isEqual from 'lodash.isequal';
import ComponentWrapper from 'components/ComponentWrapper';

interface FieldDivProps {
  dimensions: { width: number; height: number };
  printMode?: boolean;
}
const FieldDiv = styled.div<FieldDivProps>`
  position: relative;
  overflow: hidden;
  background-color: #fffefe;
  ${flexCenter()};

  /* TO-DO print left side is cut off*/
  margin-left: ${({ printMode }) => (printMode ? 1 : 0)}px;

  ${({ dimensions }) =>
    css`
      width: ${dimensions.width}px;
      height: ${dimensions.height}px;
    `};

  .window {
    position: relative;
    z-index: 1;
  }
`;

interface FieldProps {
  pageId: string;
  reference?: RefObject<HTMLDivElement> | null;
  printMode?: boolean;
}

const Field: React.FC<FieldProps> = ({
  pageId,
  reference = null,
  printMode,
}) => {
  const { components, fieldDimensions } = useStateSelector(
    ({ inventory, field }) => {
      const comps = inventory.pages[pageId].components;
      return {
        fieldDimensions: field.fieldDimensions,
        components: Object.keys(comps).map((k) => k),
      };
    },
    isEqual
  );

  return (
    <FieldDiv
      ref={reference}
      dimensions={fieldDimensions}
      printMode={printMode}
    >
      <div className='window'>
        {!printMode && <FieldGrid />}
        {Array.apply(null, Array(V_BLOCKS)).map((_, idx) => (
          <Row key={'rKey' + idx} vBlock={idx} pageId={pageId} />
        ))}
        {components.map((el, idx) => (
          <ComponentWrapper
            key={'comp' + idx}
            pageId={pageId}
            componentId={el}
            printMode={printMode}
          />
        ))}
      </div>
    </FieldDiv>
  );
};

export default React.memo(Field);
