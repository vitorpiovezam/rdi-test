import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseModel } from "../definitions/base.model";

export abstract class BaseService<T extends BaseModel> {
  private apiUrl: string;
  private controller!: string;

  constructor(
    private http: HttpClient,
    controller: string,
    ) {
    if (!environment.apiUrl) throw new Error('apiUrl is not defined');

    this.apiUrl = environment.apiUrl;
    this.controller = controller;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.controller}`);
  }

  getById(t: T): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.controller}/${t.uid}`);
  }

  create(t: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, { t });
  }

  edit(t: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}`, { t });
  }

  delete(t: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.controller}/${t.uid}`);
  }
}
