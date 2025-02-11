import { OilHistory } from '../models'
import {GetQuoteInfoDTO} from '../dtos'


class OilPriceService {
    getOilQuote(gallon: number, pricePerGallon: number) {
        const oilQuote = gallon * pricePerGallon;
        return oilQuote;
    }

    getMaginPercent(state: string, gallon: number, isFirstQuote: boolean) {
        let marginRate = 10;
        if (state == 'TX') {
            marginRate += 2;
        }
        else {
            marginRate += 4;
        }
  
        if (!isFirstQuote) {
            marginRate -= 1;
        }
  
        if (gallon >= 1000) {
            marginRate += 2;
        }
        else {
            marginRate += 3;
        }
        return marginRate / 100;
    }

    getDeliveryDate (dto: GetQuoteInfoDTO) {
        const {deliveryDate} = dto;
        return(deliveryDate);
    }

    getGallonRequested (dto: GetQuoteInfoDTO) {
        const {gallon} = dto;
        return(gallon);
    }

    async getFinalQuote(username: string, state: string, dto: GetQuoteInfoDTO) {

        try {
            const totalCountQuoted = await OilHistory.countDocuments({ user_username: username })
            const isFirstQuote = totalCountQuoted <= 0;
            const {gallon} = dto;
            const oilQuote = this.getOilQuote(gallon, 1.5);
            const marginRate = this.getMaginPercent(state, gallon, isFirstQuote);
            console.log(marginRate);
            const finalQuote = oilQuote + (oilQuote * marginRate);
            return finalQuote;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const oilPriceService = new OilPriceService();

export { oilPriceService };