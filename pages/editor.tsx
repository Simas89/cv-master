import React, { useEffect } from 'react';
import connectDB from '../lib/mongodb';
import type { NextPage } from 'next';
import styled from 'styled-components';
import LeftPanel from 'pageComps/editor/LeftPanel';
import RightPanel from 'pageComps/editor/RightPanel';
import EditorPanel from 'pageComps/editor/EditorPanel';
import useActionsField from 'state/actionHooks/useActionsField';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { ComponentType } from 'types';

const Div = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
`;

const pagesData = [
  {
    pageId: 'kwcetwjy12cd598f8',
    order: 1,
    components: {
      randomIdOne: {
        componentType: ComponentType.ITEM_A,
        width: 5,
        height: 2,
        hLocation: 3,
        vLocation: 3,
      },
      randomIdTwo: {
        componentType: ComponentType.ITEM_B,
        width: 7,
        height: 3,
        hLocation: 4,
        vLocation: 7,
      },
    },
  },
  { pageId: 'kwcetwk8773371db2', order: 2 },
];

const Editor: NextPage = () => {
  const { addNewFieldPage } = useActionsField();
  const { loadNewComponentsPage } = useActionsInventory();

  useEffect(() => {
    const pagesDataSorted = pagesData.sort((a, b) => a.order - b.order);
    pagesDataSorted.forEach((el) => {
      loadNewComponentsPage({ pageId: el.pageId, components: el.components });
      addNewFieldPage(el.pageId);
    });
  }, []);

  return (
    <Div>
      <LeftPanel />
      <EditorPanel />
      <RightPanel />
    </Div>
  );
};

// export async function getServerSideProps() {
//   connectDB().then(({ connection }) => {
//     console.log(`MongoDB Connected: ${connection.db.namespace}`);
//   });

//   return {
//     props: {},
//   };
// }

export default Editor;
