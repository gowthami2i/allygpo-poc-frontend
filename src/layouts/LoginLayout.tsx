import { Outlet } from "@tanstack/react-router";

export const LoginLayout = () => {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--app-bg-color)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
