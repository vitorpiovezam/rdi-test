import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NewProductDialogComponent } from 'src/app/pages/admin/menu/new/new-dialog.component';
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

      <div class="add-card" *ngIf="admin" (click)="new()">
        <mat-icon>add</mat-icon>
        <strong>Click to add new product</strong>
      </div>
    </div>
  `,
  styles: [`
    .list 
      display: flex
      padding: 10px 4px
      overflow-x: auto

      app-product-card:not(:last-child)
        margin-right: 15px
      
    .add-card 
      display: flex
      min-width: 200px
      flex-flow: column
      justify-content: center
      align-items: center

      :hover
        cursor: pointer

      mat-icon 
        transform: scale(1.8)
        margin-bottom: 15px
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
  onProductSelection: EventEmitter<Products>;

  selectedProducts: Products[] = [];

  constructor(private dialog: MatDialog) {
    this.onProductSelection = new EventEmitter<Products>;
  }

  ngOnInit(): void {
    this.onResetSelection?.subscribe(() => this.reset())
  }

  toggleSelect(product: Products) {
    const isSelected = this.isSelected(product);
    isSelected ?
      this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1) :
      this.selectedProducts.push(product)

    this.onProductSelection.emit(product);
  }

  new() {
    this.dialog.open(NewProductDialogComponent, {
      width: '600px',
      data: { type: this.products[0].type }
    })
  }

  isSelected(product: Products): boolean {
    return this.selectedProducts.includes(product);
  }

  reset() {
    this.selectedProducts = [];
  }
}
