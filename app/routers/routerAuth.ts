import express from "express";
import { authController } from "../controllers/authController";
import { checkMatching,controlUniqData } from "../middlewares/index";
export const authRouter = express.Router();


authRouter.post('/signup',
  controlUniqData.uniqueDataControlManager,
  checkMatching.MatchingPass,
  authController.signupAccount);

authRouter.post('/signin',authController.signinAccess);


