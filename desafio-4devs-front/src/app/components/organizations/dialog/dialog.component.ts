import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{
    organization: Organization = {}; // Modelo de dados
    isNew = true;

    constructor(
      private dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { organization: Organization, isNew: boolean }
    ) {
      this.organization = { ...data.organization };
      this.isNew = data.isNew;
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }

    isSaveEnabled(): boolean {
        return !!this.organization.name && !!this.organization.contactName;
      }


}
