import { Request, Response } from 'express';
import { CatchAsyncDecorator } from '../decorators'
import { oilPriceService } from '../services';
import { CustomRequest, UserInfo } from '../types/custom-request.type'
import { quoteHistoryService } from '../services'
import oilPriceRouter from '../routes/oil-price';


@CatchAsyncDecorator(OilPriceController.name)
class OilPriceController {
    async getOilQuote(req: CustomRequest, res: Response) {
        const { username, state } = req.userInfo as UserInfo;
        const {payload} = req.body;
        const {gallon, deliveryDate} = payload;
        console.log(deliveryDate);
        const price = await oilPriceService.getFinalQuote(username, state, payload);
        await quoteHistoryService.createQuoteHistory({ user_username: username, gallons_requested : gallon, price, deliveryDate, currency: 'USD', state })
        res.send({ price });
    }

}

const oilPriceController = new OilPriceController();

export { oilPriceController };