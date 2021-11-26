import React, { RefObject } from 'react';
import styled, { css } from 'styled-components';
import { useStateSelector } from 'state';
import { V_BLOCKS } from 'state/reducers/field';
import { FieldGrid, Row } from './';
import { Paper } from '@mui/material';
import { flexCenter } from 'common/css';
import isEqual from 'lodash.isequal';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import useActionsField from 'state/actionHooks/useActionsField';
import ComponentWrapper from 'components/ComponentWrapper';

interface FieldDivProps {
  dimensions: { width: number; height: number };
}
const FieldDiv = styled(Paper).attrs({ elevation: 20 })<FieldDivProps>`
  position: relative;
  overflow: hidden;
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
  const fieldDimensions = useStateSelector(
    ({ field }) => field.fieldDimensions,
    isEqual
  );

  const components = useStateSelector(({ inventory }) => {
    const comps = inventory.pages[pageId].components;
    return Object.keys(comps).map((k) => {
      return { componentId: k, ...comps[k] };
    });
  }, isEqual);

  console.log(components);

  const { setComponentSpaceIsFree } = useActionsField();

  useIsomorphicLayoutEffect(() => {
    const componentsDimensions = components.map((el) => {
      return {
        height: el.height,
        width: el.width,
        hLocation: el.hLocation,
        vLocation: el.vLocation,
      };
    });
    setComponentSpaceIsFree({ isFree: false, pageId, componentsDimensions });
  }, [components]);

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
            componentId={el.componentId}
            componentType={el.componentType}
            height={el.height}
            width={el.width}
            hLocation={el.hLocation}
            vLocation={el.vLocation}
          />
        ))}
      </div>
    </FieldDiv>
  );
};

export default React.memo(Field);
