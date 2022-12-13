import cogoToast from "cogo-toast";
import * as api from "../../api/index";

export const PasswordChange = (formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);

    // console.log(data);

    // console.log(response);

    // console.log(response?.data);

    if (data?.data?.success) {
      cogoToast.success(data?.data?.message);
    } else {
      cogoToast.error(data?.data?.message);
    }
  } catch (error) {
    console.log(error);
  }
};
