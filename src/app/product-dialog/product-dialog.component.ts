import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product.model';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  title: string;
  product: Product;

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
  

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: Event){
    console.log(event);
  }

  public fileLeave(event: Event){
    console.log(event);
  }
  getFileUrl(file: NgxFileDropEntry): string {
    if (file && file.fileEntry.isFile) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      const blob = (<any>fileEntry.file) as Blob;
      try {
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error creating object URL:', error);
        return '';
      }
    }
    return '';
  }
}
