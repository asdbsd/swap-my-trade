export interface IProfile {
    _id: string,
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    profileImg: string,
    myTrades: string[],
    completed: number
}

export interface IRegisterProfile {
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    profileImg: string,
    myTrades: string[],
    completed: number
}