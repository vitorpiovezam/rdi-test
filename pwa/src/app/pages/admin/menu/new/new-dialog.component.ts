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
      <h2>New Product</h2>
      <mat-icon (click)="close()">close</mat-icon>
    </header>

    <main>
      <form [formGroup]="form">
        <app-product-form formControlName="product"></app-product-form>
      </form>
    </main>

    <footer>
      <button mat-raised-button (click)="submit()" color="primary">Create</button>
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
export class NewProductDialogComponent {
  product!: Products;
  form: FormGroup;

  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialogRef<NewProductDialogComponent>,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      product: new FormControl({
        uid: String(Math.ceil(Math.random()*10000)),
        name: '',
        type: data?.type,
        imgUrl: '',
        price: ''
      })
    })
  }

  async ngOnInit() {
  }

  submit() {
    this.loading = true;

    
    const product: Products = this.form.value.product;
    console.log(product)
    this.productService.create(product).subscribe(
      res => {
        this.snackbar.open('Product created')
        this.dialog.close();
        this.loading = false;
      },
      err => {
        this.snackbar.open('Error creating Product')
        this.loading = false;
      }
    )
  } 

  close() {
    this.dialog.close();
  }
  
}
