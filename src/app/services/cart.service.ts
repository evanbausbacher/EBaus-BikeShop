import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart, ICartItem } from '../models/cart.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<ICart>({items: []});

  constructor(private snackBar: MatSnackBar) { }

  addToCart(item: ICartItem): void{
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart){
      itemInCart.quantity += 1;
    }
    else{
      items.push(item);
    }

    this.cart.next({items});
    this.snackBar.open('1 item added to cart.', 'Ok', {duration: 3000});
  }

  getTotal(items: ICartItem[]): number{
    return items.map((item) => item.price * item.quantity)
      .reduce((prev,current) => prev + current, 0);      
  }

  clearCart(): void{
    this.cart.next({items : []});
    this.snackBar.open('Cart Cleared.', 'Ok', {duration: 3000});
  }

  removeFromCart(item: ICartItem): ICartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    this.cart.next({items: filteredItems});
    this.snackBar.open('1 item removed from cart.', 'Ok', {duration: 3000});
    return filteredItems;
  }

  removeQuantity(item : ICartItem): void{
    let itemForRemoval : ICartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id){
        _item.quantity --;
        if (_item.quantity === 0){
          itemForRemoval = item;
        }
      }

      return _item;
    });

    if (itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval);
    }

    this.cart.next({items: filteredItems});
  }
}
