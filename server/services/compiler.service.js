const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const axios = require("axios");

const checkStatus = async (token) => {
  const options = {
    method: "GET",
    url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status ? response.data.status.id : null;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(token);
      }, 2000);
      return;
    } else {
      let OutputDetails = response.data;
      let SuccessToast = `Compiled Successfully!`;

      return response.data;
    }
  } catch (err) {
    console.log("err", err);
  }
};
module.exports = { checkStatus };
