import API from "./api";

export const registerWithEmailApi = async (form) => {
      console.log("form in api:-", form);
  try {
    const response = await API.post("/user/registerWithEmail", form);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || "Something went wrong while registering";
  }
};


export const sendOtpApi = async (form) => {
  try {
    const response = await API.post("/user/send-otp", form);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || "Something went wrong while sending otp";
  }
};

export const verifyOtpApi = async (form) => {
  try {
    const response = await API.post("/user/verify-otp", form);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || "Something went wrong while verifying otp";
  }
};

export const loginApi = async (formData) => {
  try {
    const response = await API.post("/user/login", formData);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data?.message || "Something went wrong";
  }
};
