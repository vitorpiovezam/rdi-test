import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Products } from "../definitions/product.model";
import { BaseService } from "./base.service";

@Injectable()
export class ProductService extends BaseService<Products> {
  constructor(http: HttpClient) {
    super(http, 'product')
  }
}