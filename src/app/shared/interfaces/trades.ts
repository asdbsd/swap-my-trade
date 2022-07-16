export interface ITrades {
    status: {
        accepted: boolean;
        pending: boolean;
        declined: boolean;
    };
    tradeStartDate: string;
    tradeEndDate: string;
    tradesRequested: any[];
    tradeImages: string[];
    address: string;
    notes: string;
    user: string;

}