import { useEffect } from "react";
import useActionsGameOfLife from "state/actionHooks/useActionsGameOfLife";

const useMovement = () => {
  const { setGameOfLife } = useActionsGameOfLife();

  useEffect(() => {
    const interval = setInterval(() => {
      setGameOfLife();
    }, 200);

    return () => clearInterval(interval);
  }, [setGameOfLife]);
};

export default useMovement;
