import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { catchError, map, tap, shareReplay } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from "../services/message.service";

import { Client } from '../interface/client';
import { CLIENTS } from '../mocks/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //private clientsUrl = 'api/clients';
  private clientsUrl = 'http://127.0.0.1:8000/api/clients';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private clients : Observable<Client[]>;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }
  
  private log(message: string): void {
    this.messageService.add(`ClientService: ${message}`);
  }

  getClients() : Observable<Client[]> {
    //return of(CLIENTS);
    return this.http.get<Client[]>(this.clientsUrl)
      .pipe(
        tap(_ => this.log('fetched clients')),
        catchError(this.handleError<Client[]>('getClients', [])),
        shareReplay(1)
        );
  }

  getClient(id: number) : Observable<Client> {
    const url = `${this.clientsUrl}/${id}`;
    //return of(CLIENTS.find(client => client.id === id));
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched client id=${id}`)),
      catchError(this.handleError<Client>(`getClient id=${id}`))
    );
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put(this.clientsUrl, client, this.httpOptions).pipe(
      tap(_ => this.log(`updated client id=${client.id}`)),
      catchError(this.handleError<any>('updateClient'))
    );
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
}
