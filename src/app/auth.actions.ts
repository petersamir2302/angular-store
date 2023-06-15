import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ token: string; username: string; userType: string }>()
);


export const logout = createAction('[Auth] Logout');
