import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../products.service';
import { Product } from '../product.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardView', [
      state('list', style({
        transform: 'translateY(20px)',
        overflow: 'hidden'
      })),
      state('card', style({
        opacity: 1,
        transform: 'none',
        height: '*'
      })),
      transition('list => card', [
        animate('300ms ease-out')
      ]),
      transition('card => list', [
        animate('300ms ease-out')
      ])
    ]),
    trigger('productAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  currentView = 'card'; // Initial view state is 'card'
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  categoryFilter = new FormControl<string[]>([]);
  
  loading = true;
  
  // Pagination variables
  paginatedProducts: Product[] = [];
  pageSize = 6; // Number of items to display per page
  currentPage = 0; // Current page index
  pageSizeOptions = [6, 12, 18]; // Available page size options
  
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
    
    this.updatePagination();
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
  toggleView(view: 'card' | 'list') {
    this.currentView = view;
  }
  
  
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }
  
  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
}
