import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Organization } from 'src/app/models/organization.model';
import { OrganizationReview, Review } from 'src/app/models/review.model';
import { UserList, UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialogComponent implements OnInit {

  selectedOrganizations: OrganizationReview[] = [];
  organizations: Organization[] = [];
  users: UserModel[] = [];
  review: Review = new Review();
  selectedMonth: string | null = null;
  selectedYear: string | null = null;
  months: { value: string | null; viewValue: string }[] = [
    { value: '01', viewValue: 'Janeiro' },
    { value: '02', viewValue: 'Fevereiro' },
    { value: '03', viewValue: 'Março' },
    { value: '04', viewValue: 'Abril' },
    { value: '05', viewValue: 'Maio' },
    { value: '06', viewValue: 'Junho' },
    { value: '07', viewValue: 'Julho' },
    { value: '08', viewValue: 'Agosto' },
    { value: '09', viewValue: 'Setembro' },
    { value: '10', viewValue: 'Outubro' },
    { value: '11', viewValue: 'Novembro' },
    { value: '12', viewValue: 'Dezembro' }
  ];

  constructor(
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { organizations: Organization[], users: UserModel[] }
  ) {
    this.organizations = data.organizations;
    this.users = data.users;
  }

  ngOnInit(): void {}

  getSelectedPercentage(): number {
    return this.review.organizationReviews.length / this.organizations.length * 100;
  }

  areOrganizationsValid(): boolean {
    return true
  }

  isSaveEnabled(): boolean {
    return this.review.referenceMonth !== null && 
      this.review.referenceMonth.length >= 1 &&
      this.review.referenceYear !== null && 
      this.review.referenceYear.length >= 4 && 
      this.review.organizationReviews.length > 0 &&
      this.review.userId !== undefined &&
      this.OrganizationReviewIsValid(this.review.organizationReviews);
  }

  OrganizationReviewIsValid(reviews: OrganizationReview[]){
    return reviews.every(review => review.comment !== undefined && review.comment !== null && review.comment.length > 0
      && review.rating !== undefined && review.rating !== null && review.rating >= 0 && review.rating <= 10);
  }
}
