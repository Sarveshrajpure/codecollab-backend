require("dotenv").config();
module.exports = {
  APP: {},
  APP_VALIDATIONS: {
    idValidation: { version: "uuidv4" },
    strongPasswordRegex:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    phoneRegex: /^[6-9]\d{9}$/,
    tableNumberRegEx: /^[1-9][0-9]*$/,
  },
  SOCKET_ACTIONS: {
    JOIN: "join",
    JOINED: "joined",
    DISCONNECTED: "disconnected",
    CODE_CHANGE: "code-change",
    SYNC_CODE: "sync-code",
    LEAVE: "leave",
  },
  COMPILER_STATUES: [
    {
      id: 1,
      description: "In Queue",
    },
    {
      id: 2,
      description: "Processing",
    },
    {
      id: 3,
      description: "Accepted",
    },
    {
      id: 4,
      description: "Wrong Answer",
    },
    {
      id: 5,
      description: "Time Limit Exceeded",
    },
    {
      id: 6,
      description: "Compilation Error",
    },
    {
      id: 7,
      description: "Runtime Error (SIGSEGV)",
    },
    {
      id: 8,
      description: "Runtime Error (SIGXFSZ)",
    },
    {
      id: 9,
      description: "Runtime Error (SIGFPE)",
    },
    {
      id: 10,
      description: "Runtime Error (SIGABRT)",
    },
    {
      id: 11,
      description: "Runtime Error (NZEC)",
    },
    {
      id: 12,
      description: "Runtime Error (Other)",
    },
    {
      id: 13,
      description: "Internal Error",
    },
    {
      id: 14,
      description: "Exec Format Error",
    },
  ],
};
