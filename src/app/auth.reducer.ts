import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  username: string | null;
  userType: string | null;
}

export const initialState: AuthState = {
  token: null,
  username: null,
  userType: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { token, username, userType }) => ({
    ...state,
    token: token,
    username: username,
    userType: userType,
  })),
  on(logout, state => ({
    ...state,
    loggedIn: false,
    token: null,
    username: null
  }))
);
