import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

import useStyles from "./styles";

import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const Navigate = useNavigate();
  const Location = useLocation();
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch({
      type: "LOGOUT",
    });

    Navigate("/auth");

    setUser(null);
  }, [Navigate, dispatch]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [user?.token, logout, Location, dispatch]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="100"
          />
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user?.result?.name}
                src={user?.result?.imageUrl}
              >
                {user?.result?.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} varient="h6">
                {user?.result?.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
