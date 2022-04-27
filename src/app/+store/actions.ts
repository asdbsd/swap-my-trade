import { createAction, props } from '@ngrx/store'
import { IProfile } from '../shared/interfaces/profiles';

const namespace = 'CURRENT_USER';

export const setCurrentUser = createAction(
    `${namespace} SET CURRENT USER`,
    props<{ currentUser: IProfile }>()
)
export const clearCurrentUser = createAction(
    `${namespace} CLEAR CURRENT USER`
);

export const addError = createAction(
    `${namespace} ADD ERROR`,
    props<{ error: string }>()
)

export const clearError = createAction(
    `${namespace} CLEAR ERROR`
)