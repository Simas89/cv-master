import React from 'react';
import styled from 'styled-components';
import useActionsField from 'state/actionHooks/useActionsField';
import { Checkbox, FormControlLabel, Slider } from '@mui/material';
import { useStateSelector } from 'state';
import { PrintAll } from './PrintAll';
import PanelWraper from 'components/PanelWrapper';

const StyledPanelWraper = styled(PanelWraper)`
  position: relative;
  padding: 15px;
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  border: 1px solid gray;
`;

const RightPanel = () => {
  const zoom = useStateSelector(({ field }) => field.zoom);
  const showGrid = useStateSelector(({ field }) => field.showGrid);
  const { setZoom, setShowGrid } = useActionsField();

  // @ts-ignore
  const handleSetZoom = (e) => {
    const value = Number(e.target.value);
    setZoom(value);
  };

  return (
    <StyledPanelWraper>
      <PrintAll />
      <br />
      <Slider
        value={zoom}
        onChange={handleSetZoom}
        defaultValue={1}
        valueLabelDisplay='auto'
        step={0.1}
        // marks
        min={0.5}
        max={1.5}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={showGrid}
            onChange={() => setShowGrid(!showGrid)}
          />
        }
        label='Show grid'
      />
    </StyledPanelWraper>
  );
};

export default RightPanel;
