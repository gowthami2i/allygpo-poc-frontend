import "./login.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useGetLogin } from "../../hook/login/useLogin";
import { usePageNavigation } from "../../hook/global/UsePageNavigation";
import Loader from "../../components/global/loader/Loader";
import { useAuth } from "../../context/AuthContext";
// Import useAuth

const Login = () => {
  const { mutate: loginDetails, isPending } = useGetLogin();
  const { navigateTo } = usePageNavigation();
  const { login } = useAuth(); // Get login function from AuthContext

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
      loginDetails(values.value, {
        onSuccess: (data) => {
          if (data.data.success) {
            login(); // Update authentication state
            navigateTo("/home"); // Navigate to home
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
            <div className="empty"></div>
            <div className="left-container-data">
              <div className="title-row">
                <div id="logo-image"></div>
                <div className="welcome-text">Sign in</div>
                <div className="enter-details-label">
                  Welcome back! Please enter your details
                </div>
                <div className="flex flex-column gap-2">
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
                        <InputText
                          id="password"
                          type="password"
                          onChange={(e) => field.setValue(e.target.value)}
                          aria-describedby="username-help"
                          placeholder="Password"
                        />
                        <FieldInfo field={field} />
                      </>
                    )}
                  />

                  <a id="forgotPassword" href="#">
                    Forgot your password?
                  </a>
                  <Button label="Sign in" size="small" />
                </div>
              </div>
            </div>

            <div className="allyiq-help-text">
              AllyIQ provides GPO members with access to a suite of tools,
              analytics, and information to support practices clinically,
              operationally, and financially. Elements of this suite may be
              based on estimates, interpretations, summarizations, or data that,
              despite best efforts, may prove to be flawed or imprecise. By
              utilizing AllyIQ, member acknowledges this risk and agrees to hold
              the GPO harmless for any inaccuracies in the AllyIQ suite.
            </div>
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

