import React from 'react';
import styled from 'styled-components';
import { useStateSelector, pagesSelector } from 'state';
import isEqual from 'lodash.isequal';
import { Typography } from '@mui/material';
import { flexCenter } from 'common/css';
import { keyGen } from 'util/generateId';

const OnPageDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompListDiv = styled.div`
  /* border: 1px solid red; */
  margin: 10px 0;

  .item {
    border: 1px solid black;
    margin-bottom: 5px;
    padding: 10px 0;
    ${flexCenter()};
  }
`;

interface CompListProps {
  pageId: string;
}

const CompList: React.FC<CompListProps> = ({ pageId }) => {
  const components = useStateSelector(({ inventory }) => {
    const comps = inventory.pages[pageId].components;
    return Object.keys(comps)
      .map((k) => {
        return {
          componentType: comps[k].componentType,
          timeStamp: comps[k].timeStamp,
        };
      })
      .sort((a, b) => b.timeStamp - a.timeStamp);
  }, isEqual);

  console.log(components);
  return (
    <CompListDiv>
      {components.map((el, idx) => (
        <div className='item' key={keyGen()}>
          {el.componentType}
        </div>
      ))}
    </CompListDiv>
  );
};

const OnPage = () => {
  const pages = useStateSelector(pagesSelector, isEqual);

  console.log(pages);
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
