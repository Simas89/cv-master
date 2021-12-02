import React, { Fragment } from 'react';
import styled from 'styled-components';
import useActionsField from 'state/actionHooks/useActionsField';
import { useStateSelector } from 'state/typedHooks';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Page from './Page';
import { pagesSelector } from 'state';
import isEqual from 'lodash.isequal';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { generateId } from 'util/generateId';
import { motion, AnimatePresence } from 'framer-motion';

const Div = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color: #d6d6d6;

  .pages {
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .btn-add-page {
    min-height: 50px;
  }
`;

const MotionDiv = motion(Div);

const invertZoomValue = (input: number) => {
  const free = 1.5;
  return 1 + (free - input);
};

const EditorPanel = () => {
  const pages = useStateSelector(pagesSelector, isEqual);
  const zoom = useStateSelector(({ field }) => field.zoom);

  const { addNewFieldPage } = useActionsField();
  const { loadNewComponentsPage } = useActionsInventory();

  const createNewPage = () => {
    const pageId = generateId('PAGE');
    loadNewComponentsPage({ pageId });
    addNewFieldPage(pageId);
  };

  return (
    <MotionDiv>
      <Box m={1} />
      <motion.div className='pages' animate={{ zoom }}>
        {pages.map((el, idx) => (
          <div key={'key' + idx}>
            <Box m={6 * invertZoomValue(zoom)} />
            <Page
              pageId={el.pageId}
              pageOrder={el.order}
              totalPages={pages.length}
            />
          </div>
        ))}
      </motion.div>
      <Box m={3} />
      <Fab variant='extended' onClick={createNewPage} className='btn-add-page'>
        <AddIcon sx={{ mr: 1, mt: 1, mb: 1 }} />
        ADD PAGE
      </Fab>
      <Box m={3} />
    </MotionDiv>
  );
};

export default EditorPanel;
