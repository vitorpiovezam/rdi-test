import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductStatus } from "../definitions/product.model";
import { BaseService } from "./base.service";

@Injectable()
export class ProductStatusService extends BaseService<ProductStatus> {
  constructor(http: HttpClient) {
    super(http, 'productStatus')
  }
}