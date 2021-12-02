import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import Printer, { PrinterRef } from 'components/Printer';
import { useStateSelector } from 'state';

interface PrintPageProps {
  pageId: string;
}

export const PrintPage: React.FC<PrintPageProps> = ({ pageId }) => {
  const [printPages, setPrintPages] = useState<string[]>([]);
  const order = useStateSelector(
    ({ inventory }) => inventory.pages[pageId].order
  );
  const ref = useRef<PrinterRef>(null);

  const print = () => {
    setPrintPages([pageId]);
    ref.current?.handlePrint();
  };
  return (
    <>
      <Button onClick={print} size='small' variant='outlined'>
        Print
      </Button>
      <Printer
        ref={ref}
        printPages={printPages}
        documentTitle={`Page - ${order}`}
        onAfterPrint={() => setPrintPages([])}
      />
    </>
  );
};
