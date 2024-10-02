import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsernameOrEmail } from "../models/user.model";
import { IResponse } from "../../lib/common";
import { RES_CODE, RES_MSG } from "../../lib/response";

export const signup = async (req: Request, res: Response) => {
  let result: IResponse;
  try {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt);
    const newUser = await createUser({ ...req.body, password: hashedPassword });
    result = { status: RES_CODE.CREATED, data: newUser, error: false, message: RES_MSG.USER_CREATED };
  } catch (err: any) {
    result = { status: RES_CODE.UNPROCESSABLE_ENTITY, data: null, error: true, message: (err.message || RES_MSG.USER_ALREADY_EXIST) };
  }
  res.status(result.status).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await findUserByUsernameOrEmail(username, email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
};