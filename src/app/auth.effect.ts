import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { login } from './auth.actions';
import { logout } from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(({ token, username, userType }) => {
          localStorage.setItem('authData', JSON.stringify({ token, username, userType }));
        })
      ),
    { dispatch: false }
  );
  
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          // Perform any additional cleanup or API calls if needed
          // ...

          // Clear user data from local storage
          localStorage.removeItem('authData');
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
