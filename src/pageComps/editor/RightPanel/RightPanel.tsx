import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import useActionsField from 'state/actionHooks/useActionsField';
import {
  fieldDimensionsHeight,
  fieldDimensionsWidth,
} from 'state/reducers/field';
import { Button, Checkbox, FormControlLabel, Slider } from '@mui/material';
import { useStateSelector } from 'state';
import { PrintAll } from './PrintAll';

const Div = styled.div`
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
  const { setFieldDimensions, setZoom, setShowGrid } = useActionsField();

  const handleMediumClick = () => {
    setFieldDimensions({
      width: fieldDimensionsWidth.MEDIUM,
      height: fieldDimensionsHeight.MEDIUM,
    });
  };
  const handleLargeClick = () => {
    setFieldDimensions({
      width: fieldDimensionsWidth.LARGE,
      height: fieldDimensionsHeight.LARGE,
    });
  };

  // @ts-ignore
  const handleSetZoom = (e) => {
    const value = Number(e.target.value);
    setZoom(value);
  };

  return (
    <Div>
      <PrintAll />
      <br />
      <Button onClick={handleMediumClick}>96 DPI</Button>
      <Button onClick={handleLargeClick}>120 DPI</Button>
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
    </Div>
  );
};

export default RightPanel;
