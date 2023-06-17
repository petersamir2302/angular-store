import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.dataSource.data = this.products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
          this.dataSource.data = this.products;
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
            this.products[index] = { ...updatedProduct };
            this.dataSource.data = this.products;
          }
        });
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(p => p.id !== productId);
      this.dataSource.data = this.products;
    });
  }

  onPageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }
}
