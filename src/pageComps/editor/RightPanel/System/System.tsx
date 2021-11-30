import React from 'react';
import styled from 'styled-components';
import useActionsField from 'state/actionHooks/useActionsField';
import { Box, Button, Checkbox, FormControlLabel, Slider } from '@mui/material';
import { useStateSelector } from 'state';
import { PrintAll } from './PrintAll';

const Div = styled.div``;

const System = () => {
  const zoom = useStateSelector(({ field }) => field.zoom);
  const showGrid = useStateSelector(({ field }) => field.showGrid);
  const { setZoom, setShowGrid } = useActionsField();

  // @ts-ignore
  const handleSetZoom = (e) => {
    const value = Number(e.target.value);
    setZoom(value);
  };
  return (
    <Div>
      <PrintAll />
      <br />
      <Slider
        value={zoom}
        onChange={handleSetZoom}
        defaultValue={1}
        valueLabelDisplay='auto'
        step={0.1}
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
    </Div>
  );
};

export default System;
