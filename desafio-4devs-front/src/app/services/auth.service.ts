import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { USER_LOGIN_URL } from '../constants/apiUrls.constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'authToken';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(USER_LOGIN_URL, { email, password })
      .pipe(
        catchError((error: any) => {
            this.snackBar.open(error.error, 'Close', {
                duration: 3000
              });
            console.error('Error getting reviews:', error);
            return throwError(error);
          }),
        tap((response: any) => {
            this.snackBar.open('Logado com sucesso!', 'Close', {
                duration: 3000
              });
            this.saveAuthToken(response.token)
        }));
  }

  saveAuthToken(token: string): void {
    localStorage.setItem(this.localStorageKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.localStorageKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
