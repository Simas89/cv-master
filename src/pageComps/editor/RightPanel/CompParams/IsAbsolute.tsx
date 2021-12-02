import { FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';

interface IsAbsoluteProps {
  pageId: string;
  componentId: string;
}

export const IsAbsolute: React.FC<IsAbsoluteProps> = ({
  pageId,
  componentId,
}) => {
  return (
    <div>
      <FormControlLabel control={<Checkbox />} label='Absolute' />
    </div>
  );
};
