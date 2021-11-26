import React from 'react';
import styled from 'styled-components';
import GameOfLife from 'pageComps/home/GameOfLife';
import Link from 'common/components/Link';

const Div = styled.div`
  height: 100vh;
  position: relative;
  h1 {
    position: absolute;
    z-index: 10;
    margin-top: 15%;
    margin-left: 20%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Game = () => {
  return (
    <Div data-cy='home_page'>
      {/* @ts-ignore */}
      <StyledLink href='editor'>
        <h1>CREATE</h1>
      </StyledLink>
      <GameOfLife />
    </Div>
  );
};

export default Game;
