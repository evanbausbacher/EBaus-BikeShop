import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IProduct } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  private csvUrl = '../assets/StoreLogCSV.csv';

  constructor(private http : HttpClient) { }

  loadProducts(count: number, category? : string, sort? : string): Observable<IProduct[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map((result: string) => this.parseCsv(result, category)), 
      map((products : IProduct[]) => {
        // Sort products based on price
        if (sort === 'asc') {
          return products.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
          return products.sort((a, b) => b.price - a.price);
        } else {
          return products; // Default return unsorted products
        }
      }),
      map((sortedProducts: IProduct[]) => sortedProducts.slice(0, count))
    );
  }

  loadAllCategories(): Observable<string[]>{
    return this.http.get(this.csvUrl, {responseType : "text"}).pipe(
      map((result:string) => this.getCategories(result))
    );
  }

  private parseCsv(csvData: string, category? : string): IProduct[]{
    const lines = csvData.split('\n'); //each line represents one item
    const products: IProduct[] = [];

    // first line is header
    for (let i = 1; i < lines.length-1; i++){
      const columns = lines[i].split(',');

      // Join description columns if there are more than 5 columns
      let description = columns.slice(5).join(',');
      
      // Remove quotes around description if present
      description = description.replace(/^"|"$/g, '');

      if (!category || columns[1] === category){
        const product : IProduct = {
          id: parseInt(columns[0]),
          category: columns[1],
          title: columns[2],
          description: description,
          price: parseFloat(columns[3]),
          image: columns[4]
        };

        products.push(product);
      }         
    }

    return products;
  }

  private getCategories(csvData: string) : string[]{
    const lines = csvData.split('\n');
    const categoriesSet = new Set<string>();

    // Start from the second line to skip the header
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
        if (columns.length >= 2) {
            categoriesSet.add(columns[1]);
        }
    }

    return Array.from(categoriesSet);
  }

  getProductById(id: number): Observable<IProduct | undefined> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map((csvData: string) => this.parseCsv(csvData).find(product => product.id == id))
    );
  }
}
