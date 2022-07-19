import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Products, ProductsTypes } from 'src/app/shared/definitions/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { EditProductDialogComponent } from './edit/edit-dialog.component';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Manage Menu</h1>
    </header>
    <main>
      <ng-container *ngFor="let products of list">
        <h2> {{ productsTypes[products[0].type] }}s </h2>

        <app-products-list [products]="products" (onProductSelection)="edit($event)" [admin]="true"></app-products-list>
      </ng-container>
    </main>
  `,
  styles: [`
    header 
      margin-bottom: 2em
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
    private dialog: MatDialog
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

  edit(products: Products) {
    this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      data: { product: products }
    })
  }

  buildMenu() {
    this.exhibitionOrder.forEach((type: ProductsTypes) => {
      this.list.push(
        this.products.filter(product => product.type === type)
      )
    });
  }
}
