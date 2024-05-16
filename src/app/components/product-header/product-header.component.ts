import { Component, EventEmitter, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [
    MatCardModule, 
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort : string = 'Top Match';
  itemsShowCount : number = 12;

  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  ngOnInit(): void{

  }

  onSortUpdated(newSort : string): void{
    this.sortChange.emit(newSort);

    this.getSortText(newSort);
  }

  onItemsUpdated(count : number): void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(this.itemsShowCount);
  }

  onColumnsUpdated(colsNum : number): void{
    this.columnsCountChange.emit(colsNum);
  }

  private getSortText(sort : string) {
    if (sort == 'asc'){
      this.sort = "Price: Low to High";
    }
    else if (sort == 'desc'){
      this.sort = "Price: High to Low";
    }
    else if (sort == 'Top'){
      this.sort = "Top Match";
    }
    else if (sort == 'New'){
      this.sort = "New Arrivals";
    }
  }
}
