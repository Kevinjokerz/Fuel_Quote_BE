import { Router } from "express";
import { authController } from "../../controllers"
import { validateBody } from "../../middlewares"
import { userCreateValidator } from "../../validation-schemas"


const authRouter = Router();


authRouter.post('/register', validateBody(userCreateValidator), authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)





export default authRouter;