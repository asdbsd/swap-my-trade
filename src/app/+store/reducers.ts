import { createReducer, on } from '@ngrx/store';
import { clearCurrentUser, getCurrentUser, setCurrentUser } from './actions';

export interface IGlobalCurrentUser {
    readonly currentUser: object | null;
}

const initialCurrentUserState: IGlobalCurrentUser = {
    currentUser: null,
}

export const GlobalCurrenTUserReducer = createReducer(
    initialCurrentUserState,
    on(getCurrentUser, (state) => ({ ...state }) ),
    on(setCurrentUser, (state, { currentUser }) => ({...state, currentUser })),
    on(clearCurrentUser, () => ({ ...initialCurrentUserState }))
);

