export const LoginLayout = ({children}:{children: JSX.Element}) => {
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
        {children}
      </div>
    </div>
  );
};
