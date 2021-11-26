import React from "react";
import styled from "styled-components";
import ItemDiv from "./ItemDiv";

const RowDiv = styled.div`
  display: flex;
`;

interface RowProps {
  length: number;
  vBlock: number;
}

const Row = React.memo<RowProps>(({ length, vBlock }) => {
  return (
    <RowDiv>
      {Array.apply(null, Array(length)).map((_, idx) => (
        <ItemDiv key={"iKey" + idx + vBlock} vBlock={vBlock} hBlock={idx} />
      ))}
    </RowDiv>
  );
});

export default Row;
