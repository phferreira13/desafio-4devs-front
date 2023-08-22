import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization.model';
import { ResultColor, ReviewResult } from 'src/app/models/review.model';
import { UserModel } from 'src/app/models/user.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: ReviewResult[] = [];
  organizations: Organization[] = [];
  users: UserModel[] = [];
  displayedColumns = ['referenceMonth', 'referenceYear', 'promoters', 'neutrals', 'detractors', 'total', 'nps'];

  filteredReviews: ReviewResult[] = [...this.reviews];
  selectedMonth: string | null = null;
  selectedYear: string | null = null;
  months: { value: string | null; viewValue: string }[] = [
    { value: null, viewValue: 'Todos' },
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

  constructor(private dialog: MatDialog, 
    private reviewService: ReviewService,
    private organizationService: OrganizationService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadReviews();
    this.loadOrganizations();
    this.loadUsers();
  }
  private loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
        if(users.users)
            this.users = users.users;
        });
    }

  private loadOrganizations() {
    this.organizationService.getAllClients().subscribe(organizations => {
        if(organizations.organizations)
            this.organizations = organizations.organizations;
        });
    }
  private loadReviews() {
    this.reviewService.getAllReviews()
    .subscribe(reviews => {
        if(reviews.reviewResults){
            this.reviews = reviews.reviewResults;
            this.filteredReviews = [...this.reviews];
        }
    });
  }

  applyFilter() {
    this.filteredReviews = this.reviews.filter(review => {
      const monthMatch = !this.selectedMonth || review.referenceMonth === this.selectedMonth;
      const yearMatch = !this.selectedYear || review.referenceYear?.includes(this.selectedYear);
      return monthMatch && yearMatch;
    });
  }

  openAddReviewDialog() {
    // Implemente a lógica para abrir um diálogo de adição de avaliação
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
        width: '600px',
        data: { organizations: this.organizations, users: this.users}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Chame o serviço para adicionar a avaliação usando result como os dados inseridos
          console.log(result);
          this.reviewService.addReview(result).subscribe(_ => this.loadData());
        }
      });
  }

  getRowStyle(review: ReviewResult): any {
    const styles = {
        'background-color': 'white',
        'color': 'black'
    };
  
    if (review.resultColorDescription) {
      styles['background-color'] = this.getColor(review);
      styles['color'] = 'white'; // Define a cor do texto como branco para melhor legibilidade
    }
  
    return styles;
  }

  getColor(review: ReviewResult): string {
    switch (review.resultColor) {
        case ResultColor.Red:
            return '#ff0000a6';
        case ResultColor.Yellow:
            return '#ffff009c';
        case ResultColor.Green:
            return '#008000bd';
        default:
            return 'white';
    }
  }
}
