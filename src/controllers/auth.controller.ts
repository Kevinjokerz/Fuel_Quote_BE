import { Request, Response } from 'express';
import { authService } from '../services'
import { CatchAsyncDecorator } from '../decorators'
import { userEventEmitter } from '../event-emitters'
import {CustomRequest, UserInfo} from '../types/custom-request.type'

@CatchAsyncDecorator(AuthController.name)
class AuthController {
    async register(req: Request, res: Response) {
        const { payload } = req.body;
        const newUser = await authService.register(payload);
        console.log(newUser);
        res.status(201).send({ newUser });
        userEventEmitter.emitEventUserCreated(newUser);

    }
    async login(req: Request, res: Response) {
        const { payload } = req.body;
        const accessToken = await authService.login(payload);
        res.status(200).send(accessToken);
    }

    async updatePassword(req: CustomRequest, res: Response) {
        const { username } = req.userInfo as UserInfo;
        const { payload } = req.body;
        await authService.updatePassword(username, payload);
        res.status(204).send({message : "Password successfully changed"});

    }

    //    logout(req: Request, res: Response){}
}

const authController = new AuthController();

export { authController };