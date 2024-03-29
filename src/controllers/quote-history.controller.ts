import { Request, Response } from 'express';
import { CatchAsyncDecorator } from '../decorators'
import {CustomRequest, UserInfo} from '../types/custom-request.type'
import { quoteHistoryService } from '../services'


@CatchAsyncDecorator(QuoteHistoryContoller.name)
class QuoteHistoryContoller {

    async viewQuoteHistoryByUsername(req : CustomRequest, res : Response){
        const {username} = req.userInfo as UserInfo;
        const result = await quoteHistoryService.viewQuoteHistoryByUsername(username);
        res.send(result);

    }
}

const quoteHistoryContoller = new QuoteHistoryContoller();

export {quoteHistoryContoller};