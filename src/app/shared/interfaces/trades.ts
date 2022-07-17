export interface ITrades {
    status: {
        accepted: boolean;
        pending: boolean;
        declined: boolean;
    };
    startByDate: string;
    endByDate: string;
    tradesRequested: any[];
    tradeImages: string[];
    address: string;
    notes: string;
    user: { _id: string; name: string; };
    swapId: string;
}
