import { BaseModel } from "./base.model";

export class Products extends BaseModel {
  name?: string
  type!: ProductsTypes
  imgUrl?: string
  price!: number

  constructor() {
    super()
  }
}

export class ProductStatus extends BaseModel {
  product!: Products
  status!: Status

  constructor() {
    super()
  }
}

export class ProductComponents extends BaseModel {
  product!: Products;
  childProduct!: Products;

  constructor() {
    super()
  }
}

export enum ProductsTypes {
  Entrance,
  Meal,
  Dessert,
  Drink,
  DrinkNotAlcoholic,
  ComplementItem
}

export enum Status {
  Inactive,
  Active,
}

