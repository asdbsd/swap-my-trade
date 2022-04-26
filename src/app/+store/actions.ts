import { createAction, props } from '@ngrx/store'

const namespace = 'CURRENT_USER';

export const getCurrentUser = createAction(
    `${namespace} GET CURRENT USER`
)

export const setCurrentUser = createAction(
    `${namespace} SET CURRENT USER`,
    props<{ currentUser: object }>()
)
export const clearCurrentUser = createAction(
    `${namespace} CLEAR CURRENT USER`
);
