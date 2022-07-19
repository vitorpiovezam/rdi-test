import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Products, ProductsTypes } from 'src/app/shared/definitions/product.model';

@Component({
	selector: 'app-product-form',
	template: `
		<form [formGroup]="form">
			<mat-form-field appearance="fill">
				<mat-label>Name</mat-label>
				<input matInput placeholder="Product Name" formControlName="name" required>
			</mat-form-field>

			<mat-form-field appearance="fill">
				<mat-label>Image URL</mat-label>
				<input matInput formControlName="imgUrl">
			</mat-form-field>

			<mat-form-field appearance="fill">
				<mat-label>Category</mat-label>
				<mat-select placeholder="Select Category" formControlName="type">
					<mat-option *ngFor="let key of productTypesKeys; let i = index" [value]="key">
						{{ productTypes[i] }}
					</mat-option>
				</mat-select>
			</mat-form-field>

			<mat-form-field appearance="fill">
				<mat-label>Price</mat-label>
				<input matInput type="number" formControlName="price" required>
			</mat-form-field>
		</form>
  	`,
	styles: [`
		form
			display: flex
			flex-flow: column
	`],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => ProductFormComponent)
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => ProductFormComponent),
			multi: true
		}
	]
})
export class ProductFormComponent {
	product!: Products;
	form: FormGroup;

	productTypes = ProductsTypes;
	productTypesKeys = Object.keys(ProductsTypes).filter(f => !isNaN(Number(f)));

	constructor() {
		this.form = new FormGroup({
			uid: new FormControl(''),
			name: new FormControl('', [Validators.required]),
			type: new FormControl(null),
			imgUrl: new FormControl('', [Validators.required]),
			price: new FormControl('', [Validators.required]),
		});
	}

	writeValue(v: Products) {
		this.form.setValue(v, { emitEvent: true });
	}

	registerOnChange(fn: (v: any) => void) {
		this.form.valueChanges.subscribe((val) => {
			fn(val);
		});
	}

	setDisabledState(disabled: boolean) {
		disabled ? this.form.disable() : this.form.enable();
	}

	registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	onTouched: () => void = () => { };

	validate() {
		return this.form.valid
	}
}
