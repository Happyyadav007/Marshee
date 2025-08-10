import axios from "axios";

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER_ID = "MSGIND";
const MSG91_TEMPLATE_ID = "Template_Id";
const MSG91_ROUTE = "4"; 

export const sendSms = async (phone, otp) => {
  try {
    const response = await axios.get("https://api.msg91.com/api/v5/otp", {
      params: {
        authkey: MSG91_AUTH_KEY,
        mobile: `91${phone}`,
        otp: otp,
        sender: MSG91_SENDER_ID,
        template_id: MSG91_TEMPLATE_ID,
        otp_length: otp.length,
        otp_expiry: 5, 
      },
    });

    console.log("OTP sent successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};
