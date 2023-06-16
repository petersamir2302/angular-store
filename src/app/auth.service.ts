import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { login } from './auth.actions';
import { logout } from './auth.actions';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //   private apiUrl = 'http://your-api-url.com'; // Replace with your backend API URL

  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public username$: Observable<string> = this.usernameSubject.asObservable();

  constructor(private http: HttpClient, private store: Store, private router: Router) {
    
    const storedUserData = localStorage.getItem('authData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.usernameSubject.next(userData.username);
    }

  }

  login(username: string, password: string): Promise<any> {
    const token = this.generateToken();
    const userType = this.getUserType(username, password);

    this.store.dispatch(login({ token: token, username: username, userType: userType }));
    this.usernameSubject.next(username);
    if (userType === 'user') {
      this.router.navigate(['/']); // Navigate to the root route
    } else if (userType === 'admin') {
      this.router.navigate(['/dashboard']); // Navigate to the root route
    }

    // This would happen in case we had a backend for the login
    // const loginData = {
    //   username: username,
    //   password: password
    // };

    // return this.http.post(`${this.apiUrl}/login`, loginData)
    //   .toPromise()
    //   .then((response: any) => {
    //     const token = response.token;
    //     const userType = response.userType;

    //     this.store.dispatch(login({ token: token, userType: userType }));
    //   })
    //   .catch((error) => {
    //     throw new Error('Login failed. Please check your credentials.');
    //   });

    return new Promise<boolean>((resolve, reject) => {
      // Perform your authentication logic here
      // For simplicity, let's consider successful login if the username and password are not empty
      if (username && password) {
        resolve(true); // Successful login
      } else {
        reject('Invalid username or password'); // Failed login
      }
    });
  }

  private generateToken(): string {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const randomString = Math.random().toString(36).substr(2);
    return `${currentTimeInSeconds}_${randomString}`;
  }

  private getUserType(username: string, password: string): string {
    // Your logic to determine the user type based on username and password
    // For example:
    if (username === 'admin' && password === 'admin') {
      return 'admin';
    } else if (username === 'user' && password === 'user') {
      return 'user';
    } else return '';
  }
  
  logout(): void {
    // Perform any additional cleanup or API calls if needed
    // ...

    // Dispatch the logout action to update the authentication state
    this.store.dispatch(logout());
    this.usernameSubject.next('');
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  getUsername(): string {
    const authData = localStorage.getItem('authData');
    return authData ? JSON.parse(authData).username : '';
  }  
}
