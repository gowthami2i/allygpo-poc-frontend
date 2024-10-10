import { useLocation, useNavigate } from "@tanstack/react-router";

export const usePageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = (): void => {
    window.history.back(); // This uses the browser's history to go back
  };

  const navigateTo = (path: string, state?: any): void => {
    navigate({
      to: path,
      state,
    });
  };

  return {
    navigateBack,
    navigateTo,
    location,
  };
};
