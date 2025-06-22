import { useMediaQuery } from "@/hooks/use-media-query";

export const useBreakpoints = () => {
  const isLargerThanMobile = useMediaQuery("(min-width: 640px)");
  return {
    isLargerThanMobile,
  };
};
