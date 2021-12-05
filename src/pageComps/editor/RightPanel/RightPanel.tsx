import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import PanelWraper from 'components/PanelWrapper';
import System from './System';
import CompParams from './CompParams';
import PageParams from './PageParams';

const StyledPanelWraper = styled(PanelWraper)`
  .navigation {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    .row {
      display: flex;
      margin-bottom: 10px;
    }
  }
`;

enum TabsRight {
  COMP_PARAMS,
  PAGE_PARAMS,
  SYSTEM,
}

const isSelected = (target: TabsRight, state: TabsRight) => {
  return target === state ? 'contained' : 'outlined';
};

const RightPanel = () => {
  const [tab, setTab] = useState<TabsRight>(0);

  return (
    <StyledPanelWraper side='RIGHT'>
      <div className='navigation'>
        <div className='row'>
          <Button
            onClick={() => setTab(TabsRight.COMP_PARAMS)}
            size='small'
            variant={isSelected(TabsRight.COMP_PARAMS, tab)}
            fullWidth
          >
            Component
          </Button>
          <Box m={1} />
          <Button
            onClick={() => setTab(TabsRight.PAGE_PARAMS)}
            size='small'
            variant={isSelected(TabsRight.PAGE_PARAMS, tab)}
            fullWidth
          >
            Page
          </Button>
        </div>
        <div className='row'>
          <Button
            onClick={() => setTab(TabsRight.SYSTEM)}
            size='small'
            variant={isSelected(TabsRight.SYSTEM, tab)}
            fullWidth
          >
            System
          </Button>
        </div>
      </div>
      {tab === TabsRight.COMP_PARAMS && <CompParams />}
      {tab === TabsRight.PAGE_PARAMS && <PageParams />}
      {tab === TabsRight.SYSTEM && <System />}
    </StyledPanelWraper>
  );
};

export default RightPanel;
