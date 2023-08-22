import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, map, Observable } from 'rxjs';


import { UserList, UserModel } from '../models/user.model';
import { USER_LOGIN_URL } from '../constants/apiUrls.constant';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authenticatedUser: UserModel | null = null;

  constructor(private router: Router, 
    private snackBar: MatSnackBar,
    private http: HttpClient) {}

  login(email: string, password: string){

    const credentials = {
      email: email,
      password: password
    };

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }

    return this.http.post(USER_LOGIN_URL, credentials, { headers: options.headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, 'Close', {
          duration: 3000
        });
        return throwError(error);
      }),
      map(res => {
      this.router.navigate(['/home']);
      return res;
    }));
  }
}
