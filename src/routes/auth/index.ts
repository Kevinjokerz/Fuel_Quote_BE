import { Router } from "express";
import { authController, userController } from "../../controllers"
import { validateBody } from "../../middlewares"
import { userCreateValidator, userLoginValidator, updatePasswordValidator } from "../../validation-schemas"
import {authenticationMiddleware} from "../../middlewares"


const authRouter = Router();


authRouter.post('/register', validateBody(userCreateValidator), authController.register)
authRouter.post('/login',validateBody(userLoginValidator), authController.login)
authRouter.patch('/change-password',authenticationMiddleware, validateBody(updatePasswordValidator), authController.updatePassword)
// authRouter.post('/logout/:', authController.logout)





export default authRouter;