import { useMediaQuery } from "@mui/material";

const useSmScreen = () => {
  return useMediaQuery("(max-width: 599px)");
};

export default useSmScreen;
