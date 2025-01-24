import  { useState } from "react";
import "./login.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useGetLogin } from "../../hook/login/useLogin";
import { usePageNavigation } from "../../hook/global/UsePageNavigation";
import Loader from "../../components/global/loader/Loader";
import { useAuth } from "../../context/AuthContext";
import { z } from "zod";

const Login = () => {
  const { mutate: loginDetails, isPending } = useGetLogin();
  const { navigateTo } = usePageNavigation();
  const { login,setIsAuthenticated } = useAuth(); // Get login function from AuthContext

  // State for API error message
  const [apiError, setApiError] = useState<string | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values: any) => {
      // Reset API error on new submission
      setApiError(null);

      loginDetails(values.value, {
        onSuccess: async (data) => {
          if (data.data.success) {
        const userEmail = data.data.email; // Get the email from the respons
        sessionStorage.setItem("userEmail", userEmail); // Store email in sessionStorage
         await sessionStorage.setItem("isAuthenticated", data?.data?.success);
            login(); // Update authentication state
            setIsAuthenticated(data?.data?.success)
            navigateTo("/home"); // Navigate to home
          } else {
            // Set API error message
            setApiError(data.data.detail);
          }
        },
      });
    },
  });

  const FieldInfo = (field: any) => {
    return (
      <>
        {field.field.state?.meta.isTouched &&
        field.field.state?.meta.errors.length ? (
          <span className="text-xs error-card">
            {field.field.state?.meta.errors.join(", ")}
          </span>
        ) : null}
      </>
    );
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {isPending && <Loader />}
        <div className="container">
          <div className="left-container">
            <div className="left-container-data">
              <div className="title-row">
                <div id="logo-image"></div>
                <div className="welcome-text">Sign in</div>
                <div className="enter-details-label">
                  Welcome back! Please enter your details
                </div>
                <div className="mt-4">
                  {apiError && (
                    <span className="text-xs error-card ">{apiError}</span>
                  )}
                </div>
                <div className="flex flex-column gap-2 ">
                  <form.Field
                    name="email"
                    children={(field) => (
                      <>
                        <label htmlFor="email">Email Address</label>
                        <InputText
                          id="email"
                          onChange={(e) => field.setValue(e.target.value)}
                          aria-describedby="username-help"
                          placeholder="Email Address"
                          className="input"
                        />
                        <FieldInfo field={field} />
                      </>
                    )}
                  />
                  <form.Field
                    name="password"
                    children={(field) => (
                      <>
                        <label htmlFor="password">Password</label>
                        <div className="flex input-password justify-content-between">
                          <InputText
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            onChange={(e) => field.setValue(e.target.value)}
                            aria-describedby="username-help"
                            placeholder="Password"
                            className="border-none"
                          />
                          <Button
                            type="button"
                            icon={`pi ${
                              passwordVisible ? "pi-eye-slash" : "pi-eye"
                            }`}
                            onClick={togglePasswordVisibility}
                            className=""
                          />
                          <FieldInfo field={field} />
                        </div>
                      </>
                    )}
                  />

                  {/* Display API error message */}

                  {/* <a id="forgotPassword" href="#">
                    Forgot your password?
                  </a> */}
                  <Button
                    label="Sign in"
                    size="small"
                    className="login-button mt-4"
                  />
                </div>
              </div>
            </div>

            {/* <div className="allyiq-help-text">
              AllyIQ provides GPO members with access to a suite of tools,
              analytics, and information to support practices clinically,
              operationally, and financially. Elements of this suite may be
              based on estimates, interpretations, summarizations, or data that,
              despite best efforts, may prove to be flawed or imprecise. By
              utilizing AllyIQ, member acknowledges this risk and agrees to hold
              the GPO harmless for any inaccuracies in the AllyIQ suite.
            </div> */}
          </div>
          <div className="right-container">
            <div id="signin-image"></div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
