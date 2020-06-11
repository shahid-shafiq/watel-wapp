import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from "../services/message.service";

import { Bill } from '../interface/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private billsUrl = 'http://127.0.0.1:8000/api/bills';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private log(message: string): void {
    this.messageService.add(`ClientService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  postBill(bill): Observable<any> {
    return this.http.post(this.billsUrl, bill, this.httpOptions).pipe(
      tap(_ => this.log(`posted bill id=${bill.client_id}`)),
      catchError(this.handleError<any>('postClient'))
    );
  }
}
