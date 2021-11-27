import useActionsField from 'state/actionHooks/useActionsField';

interface Dimensions {
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
}

interface SetSpaceInputs {
  pageId: string;
  componentsDimensions: Dimensions[];
  isFree: boolean;
}

type SetSpace = (input: SetSpaceInputs) => void;

const useCreateFreeSpace = () => {
  const { setComponentSpaceIsFree } = useActionsField();

  const setSpace: SetSpace = ({ pageId, isFree, componentsDimensions }) => {
    setComponentSpaceIsFree({ isFree, pageId, componentsDimensions });
  };

  return setSpace;
};

export default useCreateFreeSpace;
