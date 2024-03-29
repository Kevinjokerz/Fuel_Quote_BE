import { CatchAsyncDecorator } from '../decorators'
import { CreateHistoryDTO } from '../dtos';
import { OilHistory, OilHistoryDoc } from '../models'


@CatchAsyncDecorator(QuoteHistoryService.name)
class QuoteHistoryService {
    async viewQuoteHistoryByUsername (username : string){
        const histories = await OilHistory.find({username});
        return histories;
    }

    async createQuoteHistory (dto : CreateHistoryDTO){
        const newHistory = await OilHistory.create(dto);
        return newHistory;
    }
}

const quoteHistoryService = new QuoteHistoryService();

export {quoteHistoryService};