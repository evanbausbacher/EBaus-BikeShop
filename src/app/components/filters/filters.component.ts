import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule, 
    MatBadgeModule, 
    MatMenuModule, 
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();

  constructor(private storeService : StoreService){}

  categories : string[] | undefined;
  categorySubscription : Subscription | undefined;

  ngOnInit() : void{
    this.getCategories();
  }

  ngOnDestroy(): void{
    if (this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }
  
  onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

  getCategories(){
    this.categorySubscription = this.storeService.loadAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    })
  }
}
