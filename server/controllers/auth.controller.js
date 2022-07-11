const { ApiError } = require("../middlewares/apiError");
const { User } = require("../models/user");
const { authService } = require("../services/");
const {
  registerSchema,
  loginSchema,
} = require("../validations/regitserLoginValidations");
const httpStatus = require("http-status");

const authController = {
  async register(req, res, next) {
    try {
      //validating using joi

      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        //chechking if email is taken
        if (await User.emailTaken(value.email)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "User with this email already exists"
          );
        }

        let user = await authService.createUser(
          value.email,
          value.password,
          value.firstName,
          value.lastName,
          value.phone
        );

        res.status(httpStatus.CREATED).send({
          user,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async signin(req, res, next) {},
  async isauth(req, res, next) {},
};
module.exports = authController;
