import { ISwap } from "./swaps"
import { ITrades } from "./trades"

export interface IProfile {
    _id: string;
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImg: string;
    myTrades: string[];
    myTradeOffers: ITrades[];
    mySwaps: ISwap[];
}

export interface IRegisterProfile {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImg: string;
    myTrades: string[];
}