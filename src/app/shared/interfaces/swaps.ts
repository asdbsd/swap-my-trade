
export interface ISwap {
    _id: string;
    swapTitle: string;
    trade: string;
    _ownerId: string;
    additionalNotes: string;
    openUntil: string;
    tradeOffers: [{
        status: {
            accepted: boolean;
            pending: boolean;
            declined: boolean;
        };
        startByDate: string;
        endByDate: string;
        tradesRequested: any[];
        address: string;
        notes: string;
        user: string;
        swapId: string;
        tradeImages: string[];
    }];
    status: {
        completed: Boolean;
    };
    swapImages: string[];
}