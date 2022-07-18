import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductComponents } from "../definitions/product.model";
import { BaseService } from "./base.service";

@Injectable()
export class ProductComponentsService extends BaseService<ProductComponents> {
  constructor(http: HttpClient) {
    super(http, 'productStatus')
  }
}