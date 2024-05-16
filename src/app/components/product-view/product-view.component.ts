import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.mode';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    CommonModule, RouterModule
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<IProduct>();

  @Input() product : IProduct | undefined;

  constructor(private router : Router){

  }

  onAddToCart(): void{
    this.addToCart.emit(this.product);
  }

  onProductClick(): void{
    if (this.product){
      this.router.navigate(['/product', this.product.id]);
    }
  }
}
