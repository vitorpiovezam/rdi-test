import { Component, Input } from '@angular/core';
import { Products } from '../../definitions/product.model';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">  
        <input *ngIf="!admin" type="checkbox" [checked]="isSelected"/>    

        <img class="photo" [src]="product.imgUrl" width="150px">
        <h3> {{ product.name }} </h3>
        <h3 class="price">{{ product.price | currency: 'BRL' }}</h3> 
    </div>
  `,
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent {
    @Input()
    product!: Products;

    @Input()
    admin = false;

    @Input()
    isSelected = false;
}
