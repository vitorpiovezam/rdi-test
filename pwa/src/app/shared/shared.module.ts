import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { QueueBarModule } from "ngx-mat-queue-bar";
import { ProductService } from "src/app/shared/services/product.service";
import { ListComponent } from "./components/product-list/product-list.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormComponent } from "./forms/product/product-form.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    ProductCardComponent,
    ListComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    ProductService
  ],
  exports: [
    ProductCardComponent,
    ListComponent,
    MatIconModule,
    MatButtonModule,
    ProductFormComponent,
  ]
})
export class SharedModule { }
