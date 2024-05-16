import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ICart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  cart: ICart = {items: []};

  constructor(private cartService : CartService,
              private storeService : StoreService
  ){

  }

  ngOnInit(): void{
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
