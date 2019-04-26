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

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // return Promise.reject(error.message || error);
    return Promise.resolve('call failed (status=' + error.status + ', message=' + error.message + ')');
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
        return JSON.parse(res);
      }))
      .pipe(catchError((e: any) => this.handleError(e)));
  }

  /**
   *
   * Returns a Observable<HelloResponse> (JSON).
   * See map() section on how the result is created.
   *
   * @param param
   */
  public getHello3(param: string): Observable<HelloResponse> {
    const serviceUrl = 'http://localhost:8080/greeting?name=' + param;
    console.log('calling service URL ' + serviceUrl);

    return this.http.get<HelloResponse>(serviceUrl)
      .pipe(map( res => {
        return res;
      }))
      .pipe(catchError((e: any) => this.handleError(e)));
  }

  /**
   *
   * Returns a Observable<HelloResponse> (JSON).
   * See map() section on how the result is created.
   *
   * @param param
   */
  public getHellos(param: string): Observable<HelloResponse[]> {
    const serviceUrl = 'http://localhost:8080/greetings?name=' + param;
    console.log('calling service URL ' + serviceUrl);

    return this.http.get<HelloResponse>(serviceUrl)
      .pipe(map( res => {
        return res;
      }))
      .pipe(catchError((e: any) => this.handleError(e)));
  }

}
