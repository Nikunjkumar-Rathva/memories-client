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
import Input from "../Auth/Input";
import GoogleLogin from "react-google-login";

import Icon from "../Auth/icon";

import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../store/actions/auth";
import { PasswordChange } from "../../store/actions/changePassword";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  //const user = useSelector((state) => state.auth.authData);
  //console.log(user);

  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState(initialValues);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(PasswordChange(formData));

    // if (isSignUp) {
    //   dispatch(signUp(formData, Navigate));
    // } else {
    //   dispatch(signIn(formData, Navigate));
    // }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
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
        <Typography variant="h5">
          {true ? "Change Password" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!true && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            {!true && (
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
              />
            )}

            <Input
              name="oldPassword"
              label="Old Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
            />

            <Input
              name="newPassword"
              label="New Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            {true && (
              <Input
                name="confirmPassword"
                label="Confirm New Password"
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

          {!true && (
            <GoogleLogin
              clientId="663505786513-7rfiij6gqn57rm9q9p05s7bruq0t3hv6.apps.googleusercontent.com"
              render={(renderProps) => {
                return (
                  <Button
                    className={classes.googleButton}
                    color="secondary"
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
          )}

          {!true && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
