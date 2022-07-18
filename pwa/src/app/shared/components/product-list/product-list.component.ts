import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/shared/definitions/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="list">
      <ng-container *ngFor="let product of products">
        <app-product-card 
          [product]="product" 
          [isSelected]="isSelected(product)"
          [admin]="admin"
          (click)="toggleSelect(product)">
        </app-product-card>
      </ng-container>
    </div>
  `,
  styles: [`
    .list 
      display: flex
      padding: 10px 4px
      overflow-x: auto

      app-product-card:not(:last-child)
        margin-right: 15px
  `]
})
export class ListComponent implements OnInit {
  @Input()
  products: Products[] = [];

  @Input()
  onResetSelection?: Observable<void>;

  @Input()
  admin = false;

  @Output()
  onProductSelection: EventEmitter<Products[]>;

  selectedProducts: Products[] = [];

  constructor() {
    this.onProductSelection = new EventEmitter<Products[]>;
  }

  ngOnInit(): void {
    this.onResetSelection?.subscribe(() => this.reset())
  }

  toggleSelect(product: Products) {
    const isSelected = this.isSelected(product);
    isSelected ?
      this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1) :
      this.selectedProducts.push(product)

    this.onProductSelection.emit(this.selectedProducts);
  }

  isSelected(product: Products): boolean {
    return this.selectedProducts.includes(product);
  }

  reset() {
    this.selectedProducts = [];
  }
}
