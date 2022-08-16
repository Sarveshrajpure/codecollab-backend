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

    // const resultView = {
    //   source_code: "Y29uc29sZS5sb2coImhlbGxvIik7\n",
    //   language_id: 63,
    //   stdin: "",
    //   expected_output: null,
    //   stdout: "aGVsbG8K\n",
    //   status_id: 3,
    //   created_at: "2022-07-30T17:27:16.575Z",
    //   finished_at: "2022-07-30T17:27:17.457Z",
    //   time: "0.111",
    //   memory: 7012,
    //   stderr: null,
    //   token: "587c6ca1-4f37-48db-916b-ab09395b32fd",
    //   number_of_runs: 1,
    //   cpu_time_limit: "5.0",
    //   cpu_extra_time: "1.0",
    //   wall_time_limit: "10.0",
    //   memory_limit: 128000,
    //   stack_limit: 64000,
    //   max_processes_and_or_threads: 60,
    //   enable_per_process_and_thread_time_limit: false,
    //   enable_per_process_and_thread_memory_limit: false,
    //   max_file_size: 1024,
    //   compile_output: null,
    //   exit_code: 0,
    //   exit_signal: null,
    //   message: null,
    //   wall_time: "0.155",
    //   compiler_options: null,
    //   command_line_arguments: null,
    //   redirect_stderr_to_stdout: false,
    //   callback_url: null,
    //   additional_files: null,
    //   enable_network: false,
    //   status: { id: 3, description: "Accepted" },
    //   language: { id: 63, name: "JavaScript (Node.js 12.14.0)" },
    // };

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
          
        });
      // console.log("in compile");
      // res.status(httpStatus.OK).send(resultView);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = compilerController;
