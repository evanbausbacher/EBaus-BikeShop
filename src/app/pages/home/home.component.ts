import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductViewComponent } from '../../components/product-view/product-view.component';
import { IProduct } from '../../models/product.mode';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT : {[id:number] : number }= {1 : 400, 3 : 335, 4 : 350}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule, 
    ProductHeaderComponent,
    FiltersComponent,
    MatGridListModule,
    ProductViewComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  cols : number = 3;
  rowHeight : number = ROWS_HEIGHT[this.cols];

  showCategory : string = '';
  products : IProduct[] | undefined;
  count : number = 12;
  sort : string = '';
  productsSubscription : Subscription | undefined;

  constructor(private cartService : CartService, private storeService : StoreService){}

  ngOnInit(): void {
    this.getProducts();
  }

  onColumnsChange(colsNum : number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void{
    this.showCategory = newCategory;
    this.getProducts();
  }

  onItemsCountChange(newCount : number): void{
    this.count = newCount;
    this.getProducts();
  }

  onSortChange(sort : string): void{
    this.sort = sort;
    this.getProducts();
  }

  onAddToCart(product: IProduct): void{
    this.cartService.addToCart({
      product: product.image,
      name : product.title,
      price: product.price,
      quantity : 1,
      id: product.id
    });
  }

  getProducts(){
    console.log("Calling for ", this.count,  " products with ", this.showCategory , " category.")
    this.productsSubscription = this.storeService.loadProducts(this.count, this.showCategory, this.sort).subscribe({
      next: (products) => {
        this.products = products;
      }
    });
  }

  ngOnDestroy(): void{
    if (this.productsSubscription){
      this.productsSubscription.unsubscribe;
    }
  }
}
