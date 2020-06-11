import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { MessageService } from '../services/message.service';

import { Client } from '../interface/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  selectedClient: Client;

  constructor(private clientService: ClientService, private messageService: MessageService) { }

  getClients() : void {
    //this.clients = CLIENTS;
    this.clientService.getClients()
    .subscribe(res => { 
      console.log('service called');
      this.clients = res;
      console.log(this.clients);
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
    this.messageService.add(`ClientService: Selected client id=${client.id}`);
  }

}
