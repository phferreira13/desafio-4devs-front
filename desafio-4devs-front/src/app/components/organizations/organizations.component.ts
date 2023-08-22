import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  filterName = '';
  organizations: Organization[] = [];
  displayedColumns: string[] = ['name', 'contactName', 'cnpj'];

  constructor(private organizationService: OrganizationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.organizationService.getAllClients().subscribe(list => {
        if(list.organizations)
            this.organizations = list.organizations;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: { organization: {}, isNew: true }
      });
    
      dialogRef
        .afterClosed()
        .subscribe(result => {
            if (result) {
            // Chame o serviço para adicionar o cliente usando result como os dados inseridos
            console.log(result);
            this.organizationService
                .addClient(result)
                .subscribe(_ => this.loadClients());
            }
        
      });
  }

  openEditDialog(organization: any): void {
    console.log('Edit dialog opened! Organization: ' + organization);
  }

  deleteClient(organization: any): void {
    console.log('Delete dialog opened!');
  }

  applyFilter() {
    if(this.filterName){
        this.organizationService.filterByName(this.filterName).subscribe(list => {
            if(list.organizations)
                this.organizations = list.organizations;
        });
    } else {
        this.loadClients();
    }
  }

}
