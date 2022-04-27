import { createSelector } from '@ngrx/store'
import { IProfile } from '../shared/interfaces/profiles';
import { IAppState } from './reducers';

export const selectAppState = (state: IAppState)  => state.state;

export const currentUserSelector = createSelector(
    selectAppState,
    (state): IProfile | null => state.currentUser
)

export const currentErrorSelector = createSelector(
    selectAppState,
    (state): string => state.error
)