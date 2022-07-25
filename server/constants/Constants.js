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
};
