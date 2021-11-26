import { useMemo } from "react";
import { slice } from "state/reducers/inventory";
import { bindActionCreators } from "redux";
import { useStateDispatch } from "state/typedHooks";

const useActionsInventory = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};

export default useActionsInventory;
