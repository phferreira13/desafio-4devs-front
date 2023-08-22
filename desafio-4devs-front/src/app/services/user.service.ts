import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REVIEW_GET_ALL_URL, USER_GET_ALL_URL } from '../constants/apiUrls.constant';
import { UserList } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserList> {    
    return this.http.get<UserList>(USER_GET_ALL_URL);
  }
}
