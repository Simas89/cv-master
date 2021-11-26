import { useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";

type Point = "xs" | "sm" | "md" | "lg" | "xl";

const useBreakpoints = (point: Point) => {
  return useMediaQuery(({ breakpoints }: Theme) => breakpoints.down(point));
};

export default useBreakpoints;
