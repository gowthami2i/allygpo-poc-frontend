import { Header } from "../components/global/header/Header";

export const MainLayout = ({children}:{children: JSX.Element}) => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          backgroundColor: "var(--app-bg-color)",
        }}
      >
         {children}
      </div>
    </div>
  );
};
