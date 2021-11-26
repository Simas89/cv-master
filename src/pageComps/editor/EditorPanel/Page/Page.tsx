import React, { useRef } from "react";
import styled from "styled-components";
import { useStateSelector } from "state";
import useActionsField from "state/actionHooks/useActionsField";
import { H_BLOCKS } from "state/reducers/field";
// import useGameOfLife from "hooks/useGameOfLife";
import { useReactToPrint } from "react-to-print";
import { IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import Field from "./Field";
import useActionsInventory from "state/actionHooks/useActionsInventory";

const PageWrapper = styled.div`
  position: relative;

  .page-menu {
    width: 100%;
    position: absolute;
    top: -40px;
    display: flex;

    .floating-btn {
      opacity: 0.5;
      transform: scale(0.8);
      transition: 0.1s;
      &:hover {
        opacity: 1;
        transform: scale(1);
      }
    }
    .delete-btn {
      margin-left: auto;
      color: black;
      &:hover {
        color: red;
      }
    }
  }
`;

interface FieldProps {
  pageId: string;
  pageOrder: number;
  totalPages: number;
}

const Page: React.FC<FieldProps> = ({ pageId, pageOrder, totalPages }) => {
  const fieldDimensions = useStateSelector(
    ({ field }) => field.fieldDimensions
  );
  const isOn = useStateSelector(({ field }) => field.modifyMode.isOn);

  const fieldRef = useRef<HTMLDivElement>(null);

  const { setBlockSize, deletePage, resetSlotCheck, setModifyMode } =
    useActionsField();

  const { deleteComponentsPage, swapPage } = useActionsInventory();

  useIsomorphicLayoutEffect(() => {
    let newBlockSize = 0;
    if (fieldRef?.current) {
      newBlockSize = fieldRef?.current.getClientRects()[0].width / H_BLOCKS;
    }

    setBlockSize(newBlockSize);
  }, [fieldDimensions, setBlockSize]);

  const handlePrint = useReactToPrint({
    content: () => fieldRef.current,
  });

  const handleMouseLeave = () => {
    if (isOn) {
      resetSlotCheck(pageId);
      setModifyMode({ isPassing: false, pageId: "" });
    }
  };

  const handleMouseEnter = () => {
    if (isOn) {
      setModifyMode({ pageId });
    }
  };

  const removePage = () => {
    deleteComponentsPage(pageId);
    deletePage(pageId);
  };

  return (
    <PageWrapper
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="page-menu">
        <IconButton
          size="small"
          onClick={handlePrint}
          className="floating-btn"
          color="secondary"
        >
          <PrintIcon />
        </IconButton>
        {pageOrder > 1 && (
          <IconButton
            size="small"
            onClick={() => swapPage({ id: pageId, direction: "UP" })}
            className="floating-btn"
            color="secondary"
          >
            <ArrowCircleUpRoundedIcon />
          </IconButton>
        )}
        {pageOrder < totalPages && (
          <IconButton
            size="small"
            onClick={() => swapPage({ id: pageId, direction: "DOWN" })}
            className="floating-btn"
            color="secondary"
          >
            <ArrowCircleDownRoundedIcon />
          </IconButton>
        )}
        <IconButton
          size="small"
          onClick={removePage}
          className="floating-btn delete-btn"
          color="secondary"
        >
          <HighlightOffIcon />
        </IconButton>
      </div>
      <Field pageId={pageId} reference={fieldRef} />
    </PageWrapper>
  );
};

export default React.memo(Page);
