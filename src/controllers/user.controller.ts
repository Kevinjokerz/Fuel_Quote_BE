import {Request, Response} from 'express';
import { string } from 'joi';
import {userService} from '../services'
import {CatchAsyncDecorator} from '../decorators'
import {CustomRequest, UserInfo} from '../types/custom-request.type'


@CatchAsyncDecorator(UserController.name)
class UserController {
    async getProfile(req: CustomRequest, res: Response) {
        const {username} = req.userInfo as UserInfo;
        const existedUserInfo = await userService.getProfileByUsername(username);
        res.send(existedUserInfo)
    }

    async editProfile(req: CustomRequest, res: Response) {
        const {username} = req.userInfo as UserInfo;
        const updatedUser = await userService.editProfile(username, req.body);
        res.send(updatedUser);
    }
}

const userController = new UserController();
export { userController };