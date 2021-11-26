import { useMemo } from "react";
import { slice } from "state/reducers/field";
import { bindActionCreators } from "redux";
import { useStateDispatch } from "state/typedHooks";

const useActionsField = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};

export default useActionsField;
