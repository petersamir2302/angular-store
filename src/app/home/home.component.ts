import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  categoryFilter = new FormControl<string[]>([]);

  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products;
      this.categories = [...new Set(this.products.map((product: Product) => product.category))];
      this.applyCategoryFilter();
      this.loading = false;
    });

    this.categoryFilter.valueChanges.subscribe(() => {
      this.applyCategoryFilter();
    });
  }

  applyCategoryFilter() {
    const selectedCategories = this.categoryFilter.value;
    if (!selectedCategories || selectedCategories.length === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product: Product) => {
        return selectedCategories.includes(product.category);
      });
    }
  }

  selectCategory(category: string) {
    const selectedCategories = this.categoryFilter.value ?? [];
    const categoryIndex = selectedCategories.indexOf(category);
    if (categoryIndex !== -1) {
      // Category already selected, remove it
      selectedCategories.splice(categoryIndex, 1);
    } else {
      // Category not selected, add it
      selectedCategories.push(category);
    }
    this.categoryFilter.setValue(selectedCategories);
  }
}
