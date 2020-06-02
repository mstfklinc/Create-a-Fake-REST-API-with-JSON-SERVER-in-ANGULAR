import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Category} from '../category/category';
import { Observable, throwError } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient) { }

  path = "http://localhost:3000/categories"

  getCategories():Observable<Category[]>{
   return this.http.get<Category[]>(this.path).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)

   );
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
