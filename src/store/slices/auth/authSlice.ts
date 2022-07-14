import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authState, user } from '../../../types/authTypes';

const initialState: authState = {
  status: {
    isLogged: false,
    loading: false,
    error: null,
  },
  user: {
    id: null,
    email: null,
    first_name: undefined,
    last_name: null,
    profile_picture: undefined,
    position: undefined,
    phone_number: undefined,
    tg_username: undefined
  },
  modal: {
    isOpen: false,
    variant: 'login',
  },
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<user>) => {
      state.status.isLogged = true;
      state.user = action.payload;
      state.modal.isOpen = false;
      state.modal.variant = 'login';
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.status.loading = payload;
    },
    logout: (state /* action: PayloadAction<boolean> */) => {
      state.status.isLogged = false;
      state.user = {
        id: null,
        email: null,
        first_name: undefined,
        last_name: null,
        profile_picture: undefined,
        position: undefined,
        phone_number: undefined,
        tg_username: undefined
      }
    },
    openAuthModal: (state) => {
      state.modal.isOpen = true;
    },
    closeAuthModal: (state) => {
      state.modal.isOpen = false;
      state.modal.variant = 'login';
    },
    setAuthModalVariant: (state) => {
      state.modal.variant =
        state.modal.variant === 'login' ? 'register' : 'login';
    },
  },
});

export const {
  login,
  setLoading,
  logout,
  openAuthModal,
  closeAuthModal,
  setAuthModalVariant,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
