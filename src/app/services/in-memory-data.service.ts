import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Client } from '../interface/client';
import { CLIENTS } from '../mocks/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    const clients = CLIENTS;
    return {clients};
  }
  
  getId(clients: Client[]) : number {
    return clients.length > 0 ? Math.max(...clients.map(client => client.id))+1 : 1;
  }
  constructor() { }
}
