import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ORGANIZATION_ADD_URL, ORGANIZATION_FILTER_BY_NAME_URL, ORGANIZATION_GET_ALL_URL } from '../constants/apiUrls.constant';
import { Organization, OrganizationsList } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAllClients(): Observable<OrganizationsList> {
    return this.http.get<OrganizationsList>(ORGANIZATION_GET_ALL_URL);
  }

  filterByName(name: string): Observable<OrganizationsList> {
    const url = `${ORGANIZATION_FILTER_BY_NAME_URL}?name=${name}`;
    return this.http.get<OrganizationsList>(url);
  }

  addClient(client: Organization){
    return this.http.post<Organization>(ORGANIZATION_ADD_URL, client).pipe(
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(error.error, 'Close', {
              duration: 3000
            });
          console.error('Error adding Organization:', error);
          return throwError(error);
        })
      );
  }
}
