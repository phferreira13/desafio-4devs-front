import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ORGANIZATION_ADD_URL, ORGANIZATION_FILTER_BY_NAME_URL, ORGANIZATION_GET_ALL_URL } from '../constants/apiUrls.constant';
import { Organization, OrganizationsList } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<OrganizationsList> {
    return this.http.get<OrganizationsList>(ORGANIZATION_GET_ALL_URL);
  }

  filterByName(name: string): Observable<OrganizationsList> {
    const url = `${ORGANIZATION_FILTER_BY_NAME_URL}?name=${name}`;
    return this.http.get<OrganizationsList>(url);
  }

  addClient(client: Organization): Observable<Organization> {    
    return this.http.post<Organization>(ORGANIZATION_ADD_URL, client);
  }
}
