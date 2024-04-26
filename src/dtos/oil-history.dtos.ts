interface CreateHistoryDTO {
    user_username : string; 
    gallons_requested: number;
    price : number;
    deliveryDate: Date;
    currency : string; 
    state : string;
}

interface GetQuoteInfoDTO {
    gallon : number;
    deliveryDate: Date;
}

export { CreateHistoryDTO, GetQuoteInfoDTO };