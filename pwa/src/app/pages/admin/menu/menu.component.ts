import { Component, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Products, ProductsTypes } from 'src/app/shared/definitions/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <ng-container *ngFor="let products of list">
        <h2> {{ productsTypes[products[0].type] }}s </h2>

        <app-products-list [products]="products" (onProductSelection)="edit($event)" [admin]="true"></app-products-list>
      </ng-container>
    </main>
  `,
  styles: [`
    .checkout 
      position: fixed
      bottom: 30px
      right: 50px

    .submit:hover
      cursor: pointer
  `]
})
export class AdminMenuComponent {
  public productsTypes = ProductsTypes;
  products = [] as Products[];
  selectedProducts = [] as Products[];

  exhibitionOrder: ProductsTypes[] = [
    ProductsTypes.Entrance,
    ProductsTypes.Meal,
    ProductsTypes.Drink,
    ProductsTypes.DrinkNotAlcoholic,
    ProductsTypes.ComplementItem
  ];

  list = [] as Products[][];

  resetCartEvent: Subject<void> = new Subject<void>();

  constructor(
    private productService: ProductService,
  ) { }

  async ngOnInit() {
    this.getProducts();
  }

  private async getProducts() {
    this.productService.getAll().subscribe(res => {
      this.products = (res as any).Items;
      this.buildMenu();
    });
  }

  edit(product: Products[]) {
    
  }

  buildMenu() {
    this.exhibitionOrder.forEach((type: ProductsTypes) => {
      this.list.push(
        this.products.filter(product => product.type === type)
      )
    });
  }
}
