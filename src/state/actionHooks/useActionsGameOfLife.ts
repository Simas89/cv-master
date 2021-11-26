import { useMemo } from "react";
import { slice } from "state/reducers/gameOfLife";
import { bindActionCreators } from "redux";
import { useStateDispatch } from "state/typedHooks";

const useActionsGameOfLife = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};

export default useActionsGameOfLife;
