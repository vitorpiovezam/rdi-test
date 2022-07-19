import { Component, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Products, ProductsTypes } from 'src/app/shared/definitions/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h2>Edit Product</h2>
      <mat-icon (click)="close()">close</mat-icon>
    </header>

    <main>
      <form [formGroup]="form">
        <app-product-form formControlName="product"></app-product-form>
      </form>
    </main>

    <footer>
      <button mat-raised-button (click)="submit()" color="primary">Edit</button>
      <button mat-raised-button (click)="close()">Cancel</button>
    </footer>
  `,
  styles: [`
    header 
      display: flex
      justify-content: space-between
      margin-bottom: 2em
      align-items: center

      mat-icon
        transform: scale(1.2)

        &:hover
          cursor: pointer

    footer
      display: flex
      justify-content: flex-end

      button:not(:last-child) 
        margin-right: 1em
  `]
})
export class EditProductDialogComponent {
  product!: Products;
  form: FormGroup;

  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialogRef<EditProductDialogComponent>,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      product: new FormControl(this.data.product)
    })
  }

  async ngOnInit() {
    this.form.patchValue(this.product)
  }

  submit() {
    this.loading = true;

    const product: Products = this.form.value;
    this.productService.edit(product).subscribe(
      res => {
        this.loading = false;
        this.snackbar.open('Product edited')
        this.close();
      },
      err => {
        this.loading = false;
        this.snackbar.open('Error editing product')
      }
    )
  } 

  close() {
    this.dialog.close();
  }
  
}
