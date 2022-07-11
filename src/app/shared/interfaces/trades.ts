export interface ITrades {
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

}