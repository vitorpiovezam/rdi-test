import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { QueueBarModule } from "ngx-mat-queue-bar";
import { ProductService } from "src/app/shared/services/product.service";
import { ListComponent } from "../pages/products/list/list.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";

@NgModule({
  declarations: [
    ProductCardComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    ProductService
  ],
  exports: [
    ProductCardComponent,
    ListComponent
  ]
})
export class SharedModule { }
