import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { HelloResponse} from "../model/HelloResponse";

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(protected http:  HttpClient) {
  }

  /**
   * Returns a Observable<string> (JSON)
   * Caller would use JSON.parse(<the string>) to get an object from the string
   * @param param
   */
  public getHello(param: string): Observable<string> {
    const serviceUrl = 'http://localhost:8080/greeting?name=' + param;
    console.log('calling service URL ' + serviceUrl);

//    return this.http.get(serviceUrl, {responseType: 'text' as 'json'})
//     .pipe(map((res: string) => res));
    return this.http.get<String>(serviceUrl, {responseType: 'text' as 'json'})
      .pipe(catchError((e: any) => this.handleError(e)));
  }

  /**
   *
   * Returns a Observable<HelloResponse> (JSON).
   * See map() section on how the result is created.
   *
   * @param param
   */
  public getHello2(param: string): Observable<HelloResponse> {
    const serviceUrl = 'http://localhost:8080/greeting?name=' + param;
    console.log('calling service URL ' + serviceUrl);

    return this.http.get<string>(serviceUrl, {responseType: 'text' as 'json'})
      .pipe(map( res => {
        let result : HelloResponse;
        result = JSON.parse(res);
        return result;
      }))
      .pipe(catchError((e: any) => this.handleError(e)));
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // return Promise.reject(error.message || error);
    return Promise.resolve('call failed (status=' + error.status + ', message=' + error.message + ')');
  }

}
