import { Component, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Products, ProductsTypes } from 'src/app/shared/definitions/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <ng-container *ngFor="let products of list">
        <h2> {{ productsTypes[products[0].type] }}s </h2>

        <app-products-list [products]="products" (onProductSelection)="updateCart($event)" [onResetSelection]="resetCartEvent.asObservable()"></app-products-list>
      </ng-container>

      <div class="checkout" *ngIf="selectedProducts.length > 0">
        <button class="submit" (click)="submit()">Checkout ({{ selectedProducts.length }})
        {{ (selectedProducts.length > 1) ? 'Items' : 'Item' }}
        </button>
      </div>
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
export class MenuComponent {
  public productsTypes = ProductsTypes;
  products = [] as Products[];
  selectedProducts = [] as Products[];

  exhibitionOrder: ProductsTypes[] = [
    ProductsTypes.Entrance,
    ProductsTypes.Meal,
    ProductsTypes.Drink,
    ProductsTypes.DrinkNotAlcoholic,
    ProductsTypes.Dessert
  ];

  list = [] as Products[][];

  resetCartEvent: Subject<void> = new Subject<void>();

  constructor(
    private productService: ProductService,
    private snackbar: MatSnackBar
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

  buildMenu() {
    this.exhibitionOrder.forEach((type: ProductsTypes) => {
      this.list.push(
        this.products.filter(product => product.type === type)
      )
    });
  }

  isSelected(product: Products): boolean {
    return this.selectedProducts.includes(product);
  }

  updateCart(selectedProduct: Products) {
    const isSelected = this.isSelected(selectedProduct);
    isSelected ?
      this.selectedProducts.splice(this.selectedProducts.indexOf(selectedProduct), 1) :
      this.selectedProducts.push(selectedProduct)
  }

  submit() {
    this.snackbar.open('Your order is being prepared', undefined, { duration: 5000 })
    this.selectedProducts = [...[]];
    this.resetCart();
  }

  resetCart() {
    this.resetCartEvent.next();
  }
}
