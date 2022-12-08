import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import GoogleLogin from "react-google-login";

import Icon from "./icon";

import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  // Error Solved
  // Link : https://stackoverflow.com/questions/48683320/google-sso-login-error-popup-closed-by-user

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "663505786513-7rfiij6gqn57rm9q9p05s7bruq0t3hv6.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate();
  const Location = useLocation();

  const handleChange = () => {};

  const handleSubmit = () => {};

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = async (error) => {
    console.log(error);
    console.log("Google Sign In Was Unsuccessfull! Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="first Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="firstName"
                  label="first Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId="663505786513-7rfiij6gqn57rm9q9p05s7bruq0t3hv6.apps.googleusercontent.com"
            render={(renderProps) => {
              return (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              );
            }}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
