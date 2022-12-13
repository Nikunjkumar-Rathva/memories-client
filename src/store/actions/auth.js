import * as api from "../../api/index";
import { AUTH } from "../constants/actionTypes";
import cogoToast from "cogo-toast";

export const signIn = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    Navigate("/");
    cogoToast.success("Sign In Successfull");
  } catch (error) {
    console.log(error?.response?.data?.message);
    cogoToast.error(error?.response?.data?.message);
  }
};

export const signUp = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    if (data?.success) {
      // dispatch({ type: AUTH, data });
      cogoToast.success(data?.message);
      Navigate("/auth/signIn");
    } else {
      cogoToast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.message);
  }
};
