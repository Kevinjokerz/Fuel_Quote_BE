import { Request, Response } from 'express';
import { CatchAsyncDecorator } from '../decorators'
import { oilPriceService } from '../services';
import { CustomRequest, UserInfo } from '../types/custom-request.type'
import { quoteHistoryService } from '../services'


@CatchAsyncDecorator(OilPriceController.name)
class OilPriceController {
    async getOilQuote(req: CustomRequest, res: Response) {
        const { username, state } = req.userInfo as UserInfo;
        const {gallon} = req.body;
        const price = await oilPriceService.getFinalQuote(username, state, gallon);
        await quoteHistoryService.createQuoteHistory({ user_username: username, price, currency: 'USD', state })
        res.send({ price });
    }

}

const oilPriceController = new OilPriceController();

export { oilPriceController };