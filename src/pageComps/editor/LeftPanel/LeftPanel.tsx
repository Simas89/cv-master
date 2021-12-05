import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Placeholder from '../Placeholder';
import { Box } from '@mui/system';
import Library from './Library';
import OnPage from './OnPage';
import PanelWraper from 'components/PanelWrapper';

const StyledPanelWraper = styled(PanelWraper)`
  .navigation {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid gray;
    .row {
      display: flex;
      margin-bottom: 10px;
    }
  }
`;

enum TabsLeft {
  LIBRARY,
  ONPAGE,
}

const isSelected = (target: TabsLeft, state: TabsLeft) => {
  return target === state ? 'contained' : 'outlined';
};

const LeftPanel = () => {
  const [tab, setTab] = useState<TabsLeft>(0);

  return (
    <StyledPanelWraper side='LEFT'>
      <Placeholder />
      <div className='navigation'>
        <div className='row'>
          <Button
            onClick={() => setTab(TabsLeft.LIBRARY)}
            size='small'
            variant={isSelected(TabsLeft.LIBRARY, tab)}
            fullWidth
          >
            Library
          </Button>
          <Box m={1} />
          <Button
            onClick={() => setTab(TabsLeft.ONPAGE)}
            size='small'
            variant={isSelected(TabsLeft.ONPAGE, tab)}
            fullWidth
          >
            On page
          </Button>
        </div>
      </div>
      {tab === TabsLeft.LIBRARY && <Library />}
      {tab === TabsLeft.ONPAGE && <OnPage />}
    </StyledPanelWraper>
  );
};

export default LeftPanel;
