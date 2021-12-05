import React from 'react';
import styled from 'styled-components';
import { useStateSelector, pagesSelector } from 'state';
import isEqual from 'lodash.isequal';
import { Typography } from '@mui/material';
import { CompList } from '.';

const OnPageDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const OnPage = () => {
  const pages = useStateSelector(pagesSelector, isEqual);

  // console.log(pages);
  return (
    <OnPageDiv>
      {pages.map((el, idx) => (
        <div key={'comp' + idx}>
          <Typography variant='h6' align='center'>
            Page {idx + 1}
          </Typography>
          <CompList pageId={el.pageId} />
        </div>
      ))}
    </OnPageDiv>
  );
};

export default OnPage;
