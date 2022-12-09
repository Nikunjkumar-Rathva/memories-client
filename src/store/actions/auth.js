import * as api from "../../api/index";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    Navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, Navigate) => async (dispatch) => {
  try {
    console.log(formData);

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    // setIsSignUp(false);

    Navigate("/");
  } catch (error) {
    console.log(error);
  }
};
