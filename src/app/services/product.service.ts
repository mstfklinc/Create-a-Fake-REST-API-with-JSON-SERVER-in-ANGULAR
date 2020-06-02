import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Product} from '../product/products';
import { Observable, throwError } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class ProductService {

  constructor(private http:HttpClient) { }

  path = "http://localhost:3000/products";

  getProducts(categoryId): Observable<Product[]>{

    
    let newPath = this.path;
    if(categoryId){
      newPath += "?categoryId = " + categoryId;
    }
    
   // alert(categoryId)
   return this.http.get<Product[]>(newPath).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)

   );

   
  }

  addProduct(product:Product):Observable<Product>{
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Aoutorization':'Token'
      })
    }
    return this.http.post<Product>(this.path,product,httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError));
  }

  handleError(errr: HttpErrorResponse)  {
    
    let errorMessage = ''

    if(errr.error instanceof ErrorEvent){

      errorMessage = 'Bir hata oluştu' + errr.error.message

    }
    else{
      errorMessage = 'Sistemsel bir hata oluştu!'
    }

    return throwError(errorMessage)
  }
}
