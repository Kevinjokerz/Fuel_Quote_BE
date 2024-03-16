import {Request} from 'express'


type UserInfo = {name : string, username : string, city : string, state : string};

interface CustomRequest extends Request {
    userInfo?: UserInfo;
}

export {CustomRequest, UserInfo};