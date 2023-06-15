import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    const isLoggedIn = this.checkIfLoggedIn();

    return isLoggedIn.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
  private checkIfLoggedIn(): Observable<boolean> {
    const authData = localStorage.getItem('authData');
    const isLoggedIn = !!authData; // Check if authData exists
  
    return of(isLoggedIn);
  }
  
}
