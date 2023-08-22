import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review, ReviewResultList } from '../models/review.model';
import { REVIEW_ADD_URL, REVIEW_GET_ALL_URL } from '../constants/apiUrls.constant';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getAllReviews(): Observable<ReviewResultList> {
    return this.http.get<ReviewResultList>(REVIEW_GET_ALL_URL).pipe(
      catchError((error: any) => {
        this.snackBar.open(error.error, 'Close', {
            duration: 3000
          });
        console.error('Error getting reviews:', error);
        return throwError(error);
      })
    );
  }

  addReview(review: Review) {
    return this.http.post<Review>(REVIEW_ADD_URL, review).pipe(
      catchError((error: HttpErrorResponse) => {
        this.snackBar.open(error.error, 'Close', {
            duration: 3000
          });
        console.error('Error adding review:', error);
        return throwError(error);
      })
    );
  }
}
