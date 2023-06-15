import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: {
        title: 'Add Product',
        product: { id: 0, name: '', description: '', price: 0, image: '' }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(newProduct => {
          this.products.push(newProduct);
        });
      }
    });
  }
  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: {
        title: 'Edit Product',
        product: { ...product }
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result.id, result).subscribe(updatedProduct => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            // Replace the existing product object with the updated product
            this.products[index] = { ...updatedProduct };
            // Trigger change detection explicitly
            this.products = [...this.products];
          }
        });
      }
    });
  }
  

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(p => p.id !== productId);
    });
  }
}
