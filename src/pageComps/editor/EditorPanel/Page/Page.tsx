import React, { useRef } from 'react';
import styled from 'styled-components';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import { H_BLOCKS } from 'state/reducers/field';
import { IconButton } from '@mui/material';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import Field from 'components/Field';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { Paper } from '@mui/material';

const PageWrapper = styled(Paper)`
  position: relative;
  /* background-color: rgba(0, 0, 0, 0); */
  padding: 0;

  .page-menu {
    width: 100%;
    position: absolute;
    top: -40px;
    display: flex;

    .floating-btn {
      opacity: 0.5;
      transform: scale(0.8);
      transition: 0.1s;
      &:hover {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

interface FieldProps {
  pageId: string;
  pageOrder: number;
  totalPages: number;
}

const Page: React.FC<FieldProps> = ({ pageId, pageOrder, totalPages }) => {
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

  const { swapPage, setSelectedPage } = useActionsInventory();

  useIsomorphicLayoutEffect(() => {
    let newBlockSize = 0;
    if (fieldRef?.current) {
      newBlockSize = fieldRef?.current.getClientRects()[0].width / H_BLOCKS;
    }

    setBlockSize(newBlockSize);
  }, [fieldDimensions, setBlockSize]);

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
      <div className='page-menu'>
        {pageOrder > 1 && (
          <IconButton
            size='small'
            onClick={() => swapPage({ id: pageId, direction: 'UP' })}
            className='floating-btn'
            color='secondary'
          >
            <ArrowCircleUpRoundedIcon />
          </IconButton>
        )}
        {pageOrder < totalPages && (
          <IconButton
            size='small'
            onClick={() => swapPage({ id: pageId, direction: 'DOWN' })}
            className='floating-btn'
            color='secondary'
          >
            <ArrowCircleDownRoundedIcon />
          </IconButton>
        )}
      </div>
      <Field pageId={pageId} reference={fieldRef} />
    </PageWrapper>
  );
};

export default React.memo(Page);
