import React, { RefObject } from 'react';
import styled, { css } from 'styled-components';
import { useStateSelector } from 'state';
import { V_BLOCKS } from 'state/reducers/field';
import { FieldGrid, Row } from './';
import { Paper } from '@mui/material';
import { flexCenter } from 'common/css';
import isEqual from 'lodash.isequal';
import ComponentWrapper from 'components/ComponentWrapper';

interface FieldDivProps {
  dimensions: { width: number; height: number };
}
const FieldDiv = styled(Paper).attrs({ elevation: 20 })<FieldDivProps>`
  /* TO-DO print left side is cut off*/
  margin-left: 1px;

  position: relative;
  overflow: hidden;
  background-color: #fffefe;
  ${flexCenter()};

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
}

const Field: React.FC<FieldProps> = ({ pageId, reference = null }) => {
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
    <FieldDiv ref={reference} dimensions={fieldDimensions}>
      <div className='window'>
        <FieldGrid />
        {Array.apply(null, Array(V_BLOCKS)).map((_, idx) => (
          <Row key={'rKey' + idx} vBlock={idx} pageId={pageId} />
        ))}
        {components.map((el, idx) => (
          <ComponentWrapper
            key={'comp' + idx}
            pageId={pageId}
            componentId={el}
          />
        ))}
      </div>
    </FieldDiv>
  );
};

export default React.memo(Field);
