import { RootState } from '../..';

export const selectAuthModalState = (state: RootState) => state.Auth.modal;
export const selectAuthStatus = (state: RootState) => state.Auth.status;
export const userSelector = (state: RootState) => state.Auth.user;
