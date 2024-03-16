import { Router } from "express";
import { userController } from "../../controllers"
import { authenticationMiddleware } from "../../middlewares"


const userRouter = Router()

userRouter.get('/profile', authenticationMiddleware, userController.getProfile);
userRouter.put('/profile', authenticationMiddleware, userController.editProfile);

export default userRouter;