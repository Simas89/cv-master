import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { store } from "state";
import Field from "../EditorPanel/Page/Field";
import { useReactToPrint } from "react-to-print";

const getPages = () => {
  const pages = store.getState().inventory.pages;

  return Object.keys(pages)
    .map((k) => {
      return {
        pageId: k,
        order: pages[k].order,
      };
    })
    .sort((a, b) => a.order - b.order);
};

const Printer = styled.div`
  position: absolute;
  transform: translateX(1000px);

  .print-window {
    display: flex;
    flex-direction: column;
  }
`;

interface Page {
  pageId: string;
  order: number;
}

export const PrintAll = () => {
  const [printPages, setPrintPages] = useState<Page[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handlePreparePrint = () => {
    const pages = getPages();
    setPrintPages(pages);
    setTimeout(() => {
      if (typeof handlePrint !== "undefined") handlePrint();
    }, 100);
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    // removeAfterPrint: true,
    onBeforePrint: () => {
      console.log("before print");
      setPrintPages([]);
    },
    onAfterPrint: () => console.log("after print"),
  });
  return (
    <>
      <Button variant="contained" onClick={handlePreparePrint}>
        Print all
      </Button>

      {printPages.length ? (
        <Printer>
          <div ref={ref} className="print-window">
            {printPages.map((el) => (
              <Field key={el.pageId} pageId={el.pageId} />
            ))}
          </div>
        </Printer>
      ) : null}
    </>
  );
};
