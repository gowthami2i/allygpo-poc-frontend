import React from "react";
import logo from "./../../assets/images/Login-logo.svg";
import "./login.scss"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
const Login = () => {
    
    return <>
   <div className="container">
    <div className="left-container">
      <div className="empty"></div>
      <div className="left-container-data">
        <div className="title-row">
          <div id="logo-image"></div>
          <div className="welcome-text">Sign in</div>
          <div className="enter-details-label">Welcome back! Please enter your details</div>
          <div className="flex flex-column gap-2">
          <label htmlFor="username">Email Address</label>
      <InputText id="username" aria-describedby="username-help" placeholder="Email Address"/>
      <label htmlFor="username">Password</label>
         
      <InputText id="username" aria-describedby="username-help" placeholder="Password"/>
      <a id="forgotPassword" href="#">Forgot your password?</a>
      <Button label="Sign in" size="small" />

      </div>
        </div>
      </div>
      
      <div className="allyiq-help-text">
        AllyIQ provides GPO members with access to a suite of tools, analytics, and information to
        support practices clinically, operationally, and financially. Elements of this suite may
        be based on estimates, interpretations, summarizations, or data that, despite best
        efforts, may prove to be flawed or imprecise. By utilizing AllyIQ, member acknowledges
        this risk and agrees to hold the GPO harmless for any inaccuracies in the AllyIQ suite.
      </div>
    </div>
    <div className="right-container">
      <div id="signin-image"></div>
    </div>
  </div>
    </>
}

export default Login;