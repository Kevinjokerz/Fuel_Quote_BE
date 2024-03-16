import {Request, Response, NextFunction} from 'express'
import { any } from 'joi';
import { verify } from 'jsonwebtoken';
import {CustomRequest, UserInfo} from '../types/custom-request.type'

const authenticationMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const accessToken : string = req.headers['authentication'] as string;
    if(!accessToken) {
        return next(new Error('Require access token'))
    }
    const decoded = verify(accessToken, 'secretKey')
    req.userInfo = decoded as UserInfo;
    return next();
}

export {authenticationMiddleware}