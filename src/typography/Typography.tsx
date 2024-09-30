import { ITypography } from "../types/common";


const Typography = ({
  variant,
  children,
  className = "",
  style,
}: ITypography) => {
  return (
    <>
      {(() => {
        switch (variant) {
          /* Headings - Normal*/
          case "h1":
            return (
              <h1 className={`text-7xl ${className}`} style={style}>
                {children}
              </h1>
            );
          case "h2":
            return (
              <h2 className={`text-6xl ${className}`} style={style}>
                {children}
              </h2>
            );
          case "h3":
            return (
              <h3 className={`text-5xl ${className}`} style={style}>
                {children}
              </h3>
            );
          case "h4":
            return (
              <h4 className={`text-4xl ${className}`} style={style}>
                {children}
              </h4>
            );
          case "h5":
            return (
              <h5 className={`text-3xl ${className}`} style={style}>
                {children}
              </h5>
            );
          case "h6":
            return (
              <h6 className={`text-2xl ${className}`} style={style}>
                {children}
              </h6>
            );
          case "h7":
            return (
              <p className={`base ${className}`} style={style}>
                {children}
              </p>
            );
          /* paragraph - Normal*/
          case "p1":
            return (
              <p className={`text-xs ${className}`} style={style}>
                {children}
              </p>
            );
          case "p2":
            return (
              <p className={`text-sm ${className}`} style={style}>
                {children}
              </p>
            );
          case "p3":
            return (
              <p className={`text-base ${className}`} style={style}>
                {children}
              </p>
            );
          case "p4":
            return (
              <p className={`text-lg ${className}`} style={style}>
                {children}
              </p>
            );
          case "p5":
            return (
              <p className={`text-xl ${className}`} style={style}>
                {children}
              </p>
            );
          default:
            return (
              <p className={className} style={style}>
                {children}
              </p>
            );
        }
      })()}
    </>
  );
};
export default Typography;
