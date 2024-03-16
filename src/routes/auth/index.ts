import { Router } from "express";
import { authController, userController } from "../../controllers"
import { validateBody } from "../../middlewares"
import { userCreateValidator } from "../../validation-schemas"
import {authenticationMiddleware} from "../../middlewares"


const authRouter = Router();


authRouter.post('/register', validateBody(userCreateValidator), authController.register)
authRouter.post('/login', authController.login)
authRouter.patch('/change-password',authenticationMiddleware, authController.updatePassword)
// authRouter.post('/logout/:', authController.logout)





export default authRouter;