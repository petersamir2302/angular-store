import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  title: string;
  product: Product;
  @ViewChild('imageInput', { static: true }) imageInput!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.product = { ...data.product };
  }

  handleImageInput(event: any): void {
    const file = event.target.files[0];
    // Handle the file here
  }

  save(): void {
    this.dialogRef.close(this.product);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isValid(): boolean {
    return (
      this.product.title !== '' &&
      this.product.description !== '' &&
      this.product.price !== 0 &&
      this.product.image !== ''
    );
  }
  
  selectFile() : void {
    const nativeElement = this.imageInput.nativeElement;
    nativeElement.click();
  }
}
