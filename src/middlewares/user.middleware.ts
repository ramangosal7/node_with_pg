import { loginUser, signupUser } from "../app/validators/user.validator";
import { ValidationResult } from "../lib/common";
import { RES_CODE, RES_MSG } from "../lib/response";

export const validateSignup = async (req: any, res: any, next: any) => {
  try {
    const validateResult: ValidationResult = await signupUser(req.body);

    if (validateResult.error) {
      return res.status(RES_CODE.BAD_REQUEST).send({
        status: RES_CODE.BAD_REQUEST,
        error: true,
        message: validateResult.message || RES_MSG.BAD_REQUEST,
      });
    }
    next();
  } catch (err: any) {
    console.error(err, "Middleware: validateSignup error");
    return res.status(RES_CODE.BAD_REQUEST).send({
      status: RES_CODE.BAD_REQUEST,
      error: true,
      message: err.message || RES_MSG.BAD_REQUEST,
    });
  }
}

export const validateLogin = async (req: any, res: any, next: any) => {
  try {
    const validateResult: ValidationResult = await loginUser(req.body);

    if (validateResult.error) {
      return res.status(RES_CODE.BAD_REQUEST).send({
        status: RES_CODE.BAD_REQUEST,
        error: true,
        message: validateResult.message || RES_MSG.BAD_REQUEST,
      });
    }
    next();
  } catch (err: any) {
    console.error(err, "Middleware: validateLogin error");
    return res.status(RES_CODE.BAD_REQUEST).send({
      status: RES_CODE.BAD_REQUEST,
      error: true,
      message: err.message || RES_MSG.BAD_REQUEST,
    });
  }
}