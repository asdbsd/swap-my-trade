
export interface ISwap {
    _id: string,
    swapTitle: string,
    trade: string,
    _ownerId: string,
    additionalNotes: string,
    openUntil: string,
    offers: [
        {
            status: {
                accepted: boolean,
                pending: boolean,
                declined: boolean
            },
            tradeStartDate: string,
            tradeEndDate: string,
            tradesRequested: string[],
            user: string
        }],
    status: {
        completed: Boolean,
        open: Boolean
    },
    swapImages: [string]
}