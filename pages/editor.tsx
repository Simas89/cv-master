import React, { useEffect } from 'react';
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
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

const pagesData = [
  {
    pageId: 'PAGE_1_jy12cd598f8',
    order: 1,
    components: {
      randomIdOne: {
        componentType: ComponentType.ITEM_A,
        timeStamp: 123,
        dimensions: {
          width: 5,
          height: 2,
          hLocation: 3,
          vLocation: 3,
          isAbsolute: true,
          zIndex: 10,
        },
      },
      randomIdTwo: {
        componentType: ComponentType.ITEM_B,
        timeStamp: 456,
        dimensions: {
          width: 7,
          height: 3,
          hLocation: 4,
          vLocation: 7,
          isAbsolute: false,
          zIndex: 10,
        },
      },
    },
  },
  { pageId: 'PAGE_2_k8773371db2', order: 2 },
];

const Editor: NextPage = () => {
  const { addNewFieldPage } = useActionsField();
  const { loadNewComponentsPage, setSelectedComponent } = useActionsInventory();

  useEffect(() => {
    const pagesDataSorted = pagesData.sort((a, b) => a.order - b.order);
    pagesDataSorted.forEach((el) => {
      loadNewComponentsPage({ pageId: el.pageId, components: el.components });
      addNewFieldPage(el.pageId);
    });

    setSelectedComponent({
      pageId: pagesDataSorted[0].pageId,
      componentId: '',
    });
  }, [addNewFieldPage, loadNewComponentsPage, setSelectedComponent]);

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
