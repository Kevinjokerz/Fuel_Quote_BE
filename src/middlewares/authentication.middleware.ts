import { Response, NextFunction } from 'express'
import { decode, verify } from 'jsonwebtoken';
import { CustomRequest, UserInfo } from '../types/custom-request.type'
import { BadRequestError, UnAuthorizedError } from '../types/http-error.type'
import { CacheManager } from '../caching/cache-manager'

const authenticationMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.headers['authentication'] as string;
        if (!accessToken) {
            return next(new UnAuthorizedError('Require access token'))
        }
        const globalCache = await CacheManager.getGlobalCache();
        let decoded = await globalCache.get(accessToken);
        if (!decoded) {
            decoded = verify(accessToken, 'secretKey')
            globalCache.set(accessToken, decoded, 30 * 1000);
        }
        req.userInfo = decoded as UserInfo;
        return next();
    } catch (error: any) {
        if (error instanceof Error) {
            return next(new BadRequestError());
        }
        else {
            console.log(error);
            return next(error);
        }
    }

}

export { authenticationMiddleware }