import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import PanelWraper from 'components/PanelWrapper';
import System from './System';
import CompParams from './CompParams';

const StyledPanelWraper = styled(PanelWraper)`
  .navigation {
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    /* border: 1px solid red; */
  }
`;

enum TabsRight {
  COMP_PARAMS,
  SYSTEM,
}

const isSelected = (target: TabsRight, state: TabsRight) => {
  return target === state ? 'contained' : 'outlined';
};

const RightPanel = () => {
  const [tab, setTab] = useState<TabsRight>(0);

  return (
    <StyledPanelWraper>
      <div className='navigation'>
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
          onClick={() => setTab(TabsRight.SYSTEM)}
          size='small'
          variant={isSelected(TabsRight.SYSTEM, tab)}
          fullWidth
        >
          System
        </Button>
      </div>
      {tab === TabsRight.COMP_PARAMS && <CompParams />}
      {tab === TabsRight.SYSTEM && <System />}
    </StyledPanelWraper>
  );
};

export default RightPanel;
