
export interface ISwap {
    _id: string;
    swapTitle: string;
    trade: string;
    _ownerId: string;
    additionalNotes: string;
    openUntil: string;
    swapOffers: [
        {
            status: {
                accepted: boolean;
                pending: boolean;
                declined: boolean;
            };
            swapEndDate: string;
            swapStartDate: string;
            tradesRequested: any[];
            address: string;
            notes: string;
            swapOfferImages: any[];
            user: string;
        }];
    tradeOffers: [{
        status: {
            accepted: boolean;
            pending: boolean;
            declined: boolean;
        };
        tradeStartDate: string;
        tradeEndDate: string;
        tradesRequested: any[];
        address: string;
        notes: string;
        user: string;
    }];
    status: {
        completed: Boolean;
    };
    swapImages: string[];
}