import { Response, NextFunction} from 'express'
import { decode, verify } from 'jsonwebtoken';
import {CustomRequest, UserInfo} from '../types/custom-request.type'
import {BadRequestError, UnAuthorizedError} from '../types/http-error.type'

const authenticationMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const accessToken : string = req.headers['authentication'] as string;
    if(!accessToken) {
        return next(new UnAuthorizedError('Require access token'))
    }
    const decoded = verify(accessToken, 'secretKey')
    req.userInfo = decoded as UserInfo;
    return next();
}

export {authenticationMiddleware}