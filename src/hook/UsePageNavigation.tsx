import { useNavigate } from "@tanstack/react-router";

export const usePageNavigation = () => {
  const navigate = useNavigate();

  const navigateBack = (): void => {
    navigate({ to: -1 });
  }; // Go back one step in the browser history

  const navigateTo = (path: string, state?: any): void => {
    navigate({
      to: path,
      state,
    });
  };

  return {
    navigateBack,
    navigateTo,
  };
};
