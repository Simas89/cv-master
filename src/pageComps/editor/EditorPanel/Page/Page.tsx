import React, { useRef } from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import { H_BLOCKS } from 'state/reducers/field';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import Field from 'components/Field';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Paper } from '@mui/material';

const PageWrapper = styled(Paper)`
  position: relative;
  padding: 0;
`;

interface PageProps {
  pageId: string;
}

const Page: React.FC<PageProps> = ({ pageId }) => {
  const { fieldDimensions, selectedPageId } = useStateSelector(
    ({ field, inventory }) => {
      return {
        fieldDimensions: field.fieldDimensions,
        selectedPageId: inventory.selectedComponent.pageId,
      };
    }
  );
  const isOn = useStateSelector(({ field }) => field.modifyMode.isOn);

  const fieldRef = useRef<HTMLDivElement>(null);

  const { setBlockSize, resetSlotCheck, setModifyMode } = useActionsField();
  const { setSelectedPage } = useActionsInventory();

  // useIsomorphicLayoutEffect(() => {
  //   let newBlockSize = 0;
  //   if (fieldRef?.current) {
  //     newBlockSize = fieldRef?.current.getClientRects()[0].width / H_BLOCKS;
  //   }

  //   setBlockSize(newBlockSize);
  // }, [fieldDimensions, setBlockSize]);

  const handleMouseLeave = () => {
    if (isOn) {
      resetSlotCheck(pageId);
      setModifyMode({ isPassing: false, pageId: '' });
    }
  };

  const handleMouseEnter = () => {
    if (isOn) {
      setModifyMode({ pageId });
    }
  };

  const selectPage = () => {
    setSelectedPage(pageId);
  };

  return (
    <PageWrapper
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={selectPage}
      elevation={selectedPageId === pageId ? 20 : 5}
    >
      <Field pageId={pageId} reference={fieldRef} />
    </PageWrapper>
  );
};

export default React.memo(Page);
