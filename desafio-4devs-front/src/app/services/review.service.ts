import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review, ReviewResultList } from '../models/review.model';
import { REVIEW_ADD_URL, REVIEW_GET_ALL_URL } from '../constants/apiUrls.constant';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<ReviewResultList> {    
    return this.http.get<ReviewResultList>(REVIEW_GET_ALL_URL);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(REVIEW_ADD_URL, review);
  }
}
