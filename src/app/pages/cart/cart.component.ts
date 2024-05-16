import { Component } from '@angular/core';
import { ICart, ICartItem } from '../../models/cart.model';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    CurrencyPipe,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: ICart = {items: [
    {
      product : "https://placehold.co/200",
      name : "Test",
      price : 150,
      quantity: 1,
      id: 1,
  }
  ]};

  dataSource: Array<ICartItem> = [];

  displayColumns : Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  ngOnInit(): void{
    this.cartService.cart.subscribe((_cart : ICart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  constructor(private cartService: CartService){

  }

  getTotal(items: ICartItem[]): number{
    return this.cartService.getTotal(items);      
  }
  
  onClearCart(): void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: ICartItem): void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: ICartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: ICartItem): void{
    this.cartService.removeQuantity(item);
  }
}
