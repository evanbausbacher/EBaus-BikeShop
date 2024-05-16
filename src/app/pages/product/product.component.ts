import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { IProduct } from '../../models/product.mode';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  
  productId : any;
  product : any;

  constructor(private router: Router, private route: ActivatedRoute, private storeService : StoreService, private cartService : CartService){}

  ngOnInit(): void{
    this.route.params.subscribe((params) => {
      this.productId = params['id'] ?? '';
      console.log("Product ID from route: " + this.productId);
    });

    if (this.productId){
      this.storeService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.product = product;
        }
      }); 
    }
  }

  onAddToCart(): void{
    this.cartService.addToCart({
      product: this.product.image,
      name : this.product.title,
      price: this.product.price,
      quantity : 1,
      id: this.product.id
    });
  }

  onBack(): void{
    this.router.navigate(['/']);
  }
}
