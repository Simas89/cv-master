import Field from 'components/Field';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';

const PrinterDiv = styled.div`
  position: absolute;
  transform: translateX(1000px);

  .print-window {
    display: flex;
    flex-direction: column;
  }
`;
export interface PrinterRef extends HTMLDivElement {
  handlePrint: () => any;
}

interface PrinterRefInner {
  handlePrint: () => any;
}

interface PrinterProps {
  ref: React.Ref<PrinterRefInner>;
  printPages: string[];
  documentTitle: string;
  onBeforePrint?: () => any;
  onAfterPrint?: () => any;
}

const Printer: React.FC<PrinterProps> = React.forwardRef(
  (
    { printPages, documentTitle, onBeforePrint, onAfterPrint },
    forwarderDef
  ) => {
    const ref = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(forwarderDef, () => ({
      handlePrint: () => {
        return handlePrint();
      },
    }));

    const handlePrint = useReactToPrint({
      content: () => ref.current,
      removeAfterPrint: true,
      documentTitle,
      onBeforePrint,
      onAfterPrint,
    }) as () => void;

    // if (!printPages.length) return null;
    return (
      <PrinterDiv>
        <div className='print-window' ref={ref}>
          {printPages.map((el) => (
            <Field key={el} pageId={el} printMode />
          ))}
        </div>
      </PrinterDiv>
    );
  }
);
Printer.displayName = 'Printer';

export default Printer;
