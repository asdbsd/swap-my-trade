export interface ISwap {
    _id: string,
    swapTitle: string,
    swapTrade: ITrade,
    _ownerId: IProfile,
    additionalNotes: string,
    openUntil: string,
    offers: [
        {
            status: {
                accepted: Boolean,
                pending: Boolean,
                declined: Boolean
            },
            tradeStartDate: string,
            tradeEndDate: string,
            tradesRequested: ITrade[],
            user: IProfile
        }],
    status: {
        completed: Boolean,
        open: Boolean
    },
    swapImages: [string]
}

export interface ITrade {
    name: string
}

export interface IProfile {
    username: string
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    profileImg: string,
    completed: number

}