import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { store } from 'state';
import Printer, { PrinterRef } from 'components/Printer';

const getPages = () => {
  const pages = store.getState().inventory.pages;

  return Object.keys(pages)
    .map((k) => {
      return {
        pageId: k,
        order: pages[k].order,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map((el) => el.pageId);
};

export const PrintAll = () => {
  const [printPages, setPrintPages] = useState<string[]>([]);
  const ref = useRef<PrinterRef>(null);

  const print = () => {
    const pages = getPages();
    setPrintPages(pages);
    ref.current?.handlePrint();
  };

  return (
    <>
      <Button variant='contained' onClick={print} size='small'>
        Print all
      </Button>

      <Printer
        ref={ref}
        printPages={printPages}
        documentTitle='All pages'
        onAfterPrint={() => setPrintPages([])}
      />
    </>
  );
};
