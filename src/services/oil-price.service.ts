import { random } from 'lodash';
import { CatchAsyncDecorator } from '../decorators'


@CatchAsyncDecorator(OilPriceService.name)
class OilPriceService{
    async getOilQuote (){
        return Math.random() * 10;
    }
}

const oilPriceService = new OilPriceService();

export{oilPriceService};