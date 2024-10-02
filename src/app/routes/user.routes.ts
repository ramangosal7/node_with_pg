import { Router } from "express";
import { signup, login } from "../controllers/users.controller";
import { validateLogin, validateSignup } from "../../middlewares/user.middleware";

const userRouter = Router();

userRouter.post("/signup", validateSignup, signup);
userRouter.post("/login", validateLogin, login);

export default userRouter;