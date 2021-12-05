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
import { motion } from 'framer-motion';

const Div = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color: #d6d6d6;

  .btn-add-page {
    min-height: 50px;
  }
`;

const ZoomWrapperDiv = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MotionZoomWrapperDiv = motion(ZoomWrapperDiv);
const ZoomWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const zoom = useStateSelector(({ field }) => field.zoom);
  return (
    <MotionZoomWrapperDiv animate={{ zoom }}>{children}</MotionZoomWrapperDiv>
  );
};

const EditorPanel = () => {
  const pages = useStateSelector(pagesSelector, isEqual);

  const { addNewFieldPage } = useActionsField();
  const { loadNewComponentsPage } = useActionsInventory();

  const createNewPage = () => {
    const pageId = generateId('PAGE');
    loadNewComponentsPage({ pageId });
    addNewFieldPage(pageId);
  };

  return (
    <Div>
      <Box m={1} />
      <ZoomWrapper>
        {pages.map((el, idx) => (
          <Fragment key={'key' + idx}>
            <Box m={6} />
            <Page pageId={el.pageId} />
          </Fragment>
        ))}
      </ZoomWrapper>
      <Box m={3} />
      <Fab variant='extended' onClick={createNewPage} className='btn-add-page'>
        <AddIcon sx={{ mr: 1, mt: 1, mb: 1 }} />
        ADD PAGE
      </Fab>
      <Box m={3} />
    </Div>
  );
};

export default EditorPanel;
