import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultColor, ReviewResult } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: ReviewResult[] = [];

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

  constructor(private dialog: MatDialog, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }
  private loadReviews() {
    this.reviewService.getAllReviews().subscribe(reviews => {
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
