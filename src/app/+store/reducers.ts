import { createReducer, on } from '@ngrx/store';
import { IProfile } from '../shared/interfaces/profiles';
import { addError, clearCurrentUser, clearError, setCurrentUser } from './actions';

export interface IAppState {
    state: IGlobalState
}

export interface IGlobalState {
    currentUser: IProfile | null;
    error: string;
}

const initialCurrentUserState: IGlobalState = {
    currentUser: null,
    error: ''
}

export const GlobalCurrenTUserReducer = createReducer(
    initialCurrentUserState,
    on(setCurrentUser, (state: IGlobalState, { currentUser }) => ({ ...state, currentUser })),
    on(clearCurrentUser, () => ({ ...initialCurrentUserState })),
    on(addError, (state: IGlobalState, { error }) => ({ ...state, error })),
    on(clearError, (state: IGlobalState) => ({ ...state, error: '' }))
);