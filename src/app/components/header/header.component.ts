import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ICart, ICartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
  CurrencyPipe,
CommonModule,
RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private m_cart: ICart = {items: []};
  itemsQuantity : number = 0;

  @Input()
  get cart(): ICart {
    return this.m_cart;
  }

  set cart(cart: ICart){
    this.m_cart = cart;

    this.itemsQuantity = cart.items
      .map((item => item.quantity))
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private cartService : CartService){

  }

  getTotal(items : ICartItem[]): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }
}
