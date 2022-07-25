const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { compilerService } = require("../services/");
const btoa = require("btoa");
const axios = require("axios");

const compilerController = {
  async compile(req, res, next) {
    let langId = req.body.language_id;
    let code = req.body.source_code;
    let input = req.body.customInput;
    let result = "";
    const formData = {
      language_id: langId,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(input),
    };

    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    try {
      axios
        .request(options)
        .then(async function (response) {
          const token = response.data.token;
          result = await compilerService.checkStatus(token);

          res.status(httpStatus.OK).send(result);
        })
        .catch((err) => {
          let error = err.response ? err.response.data : err;
          console.log(error);
        });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = compilerController;
