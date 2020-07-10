import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, map, tap, shareReplay } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private clientsUrl = 'http://127.0.0.1:8000/api/clients';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private clients : Observable<any[]>;

  private host: string = "http://127.0.0.1:8000/api/";
  private apiUrl = {
    'vans' : this.host + 'vans',
    'dispatch' : this.host + 'dispatch',
    'delivery' : this.host + 'delivery',

  };

  constructor(
    private http: HttpClient
  ) { }

  private log(fn : string, msg : string) {
    console.log('ApiService : '+fn+ ' -> ' + msg);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log('handleError', `${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getVans() : Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl.vans)
      .pipe(
        tap(_ => this.log('getVans()', 'Success fetched vans')),
        catchError(this.handleError<any[]>('getVans', [])),
        shareReplay(1)
        );
  }

  getDispatchUnits() : Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl.dispatch)
      .pipe(
        tap(_ => this.log('getDispatchUnits()', 'fetched dispatch units')),
        catchError(this.handleError<any[]>('getDispatchUnits', [])),
        shareReplay(1)
        );
  }

  getDispatchUnit(dispid:number) : Observable<any> {
    return this.http.get<any>(this.apiUrl.dispatch+'/'+dispid)
      .pipe(
        tap(_ => this.log('getDispatchUnit()',`fetched dispatch unit ${dispid}`)),
        catchError(this.handleError<any[]>('getDispatchUnit', [])),
        shareReplay(1)
        );
  }

  createDispatch(dispatch) : Observable<any>{
    return this.http.post(this.apiUrl.dispatch, dispatch)
      .pipe(
        tap(_ => this.log('createDispatch()','defined dispatch unit')),
        catchError(this.handleError<any[]>('createDispatch', [])),
        );
  }

  addDelivery(delivery) : Observable<any>{
    this.log('addDelivery()', this.apiUrl.delivery);
    return this.http.post(this.apiUrl.delivery, delivery)
      .pipe(
        tap(_ => this.log('addDelivery()','added delivery point')),
        catchError(this.handleError<any[]>('addDelivery', [])),
        );
  }

  getDelivery(did) : Observable<any>{
    let url = this.apiUrl.delivery + "/" + did;
    this.log('getDelivery()',url);
    return this.http.get(url)
      .pipe(
        tap(_ => this.log('getDelivery()', 'retrieved delivery')),
        catchError(this.handleError<any[]>('getDelivery', [])),
        shareReplay(1),
        );
  }

  deliveredTo(did) : Observable<any>{
    let url = this.apiUrl.delivery + "/" + did;
    this.log('deliveredTo()', url);
    return this.http.put(url, {"delivered": "1"})
      .pipe(
        tap(_ => this.log('deliveredTo()', 'updated delivery status')),
        catchError(this.handleError<any[]>('deliveredTo', [])),
        );
  }
  
}
