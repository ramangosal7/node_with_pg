import Joi from "joi";
import { IUserModel } from "../models/user.model";
import { ValidationResult } from "../../lib/common";

export const signupUser = async (body: IUserModel): Promise<ValidationResult> => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(body);

    if (error)
      return { error: true, message: error.details[0].message, value: null };

    return { error: false, message: null, value };
  } catch (err: any) {
    console.error(err, "Validation: signupUser error");

    return { error: true, message: err.message, value: null };
  }
}

export const loginUser = async (body: IUserModel): Promise<ValidationResult> => {
  try {
    const schema = Joi.object({
      username: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().required()
    }).without("username", ["email"]);
    const { error, value } = schema.validate(body);

    if (error)
      return { error: true, message: error.details[0].message, value: null };

    return { error: false, message: null, value };
  } catch (err: any) {
    console.error(err, "Validation: signupUser error");

    return { error: true, message: err.message, value: null };
  }
}