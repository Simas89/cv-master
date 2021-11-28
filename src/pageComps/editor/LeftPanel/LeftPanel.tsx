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
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    /* border: 1px solid red; */
  }
`;

enum Tabs {
  LIBRARY,
  ONPAGE,
}

const isSelected = (target: Tabs, state: Tabs) => {
  return target === state ? 'contained' : 'outlined';
};

const LeftPanel = () => {
  const [tab, setTab] = useState<Tabs>(0);

  return (
    <StyledPanelWraper>
      <Placeholder />
      <div className='navigation'>
        <Button
          onClick={() => setTab(Tabs.LIBRARY)}
          size='small'
          variant={isSelected(Tabs.LIBRARY, tab)}
          fullWidth
        >
          Library
        </Button>
        <Box m={1} />
        <Button
          onClick={() => setTab(Tabs.ONPAGE)}
          size='small'
          variant={isSelected(Tabs.ONPAGE, tab)}
          fullWidth
        >
          On page
        </Button>
      </div>
      {tab === Tabs.LIBRARY && <Library />}
      {tab === Tabs.ONPAGE && <OnPage />}
    </StyledPanelWraper>
  );
};

export default LeftPanel;
