import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  filterName = '';

  constructor() { }

  ngOnInit(): void {
  }

  openAddDialog(): void {
    console.log('Add dialog opened!');
  }

  openEditDialog(organization: any): void {
    console.log('Edit dialog opened! Organization: ' + organization);
  }

  deleteClient(organization: any): void {
    console.log('Delete dialog opened!');
  }

}
