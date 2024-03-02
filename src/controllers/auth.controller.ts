import {Request, Response} from 'express';
import {authService} from '../services'
import {CatchAsyncDecorator} from '../decorators'

@CatchAsyncDecorator(AuthController.name)
class AuthController {
    async register (req: Request, res: Response) {
        const {payload} = req.body;  
        const newUser = await authService.register(payload);
        res.send({newUser});

    }
    async login(req: Request, res: Response){
            const {username, password} = req.body;
            const accessToken = await authService.login(username, password);
            return res.send(accessToken);
    }
//    logout(req: Request, res: Response){}
}

const authController = new AuthController();

export {authController};