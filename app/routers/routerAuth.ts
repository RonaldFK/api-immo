import express from "express";
import { authController } from "../controllers/authController";
import { checkMatching } from "../middlewares/checkMatching";
import { controlUniqData } from "../middlewares/controlUniqData";
export const authRouter = express.Router();

authRouter.post('/signup',
  controlUniqData.uniqueDataControlManager,
  checkMatching.MatchingPass,
  authController.signupAccount);

authRouter.post('/signin',authController.signinAccess);


