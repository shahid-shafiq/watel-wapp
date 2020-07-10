import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { ApiService } from '../services/api.service';
import { MessageService } from '../services/message.service';

import { Client } from '../interface/client';


@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  dispatch : any;
  shipment: any[];
  dclients: Client[];
  pclients: Client[];

  constructor(
    private route : ActivatedRoute,
    private apiService: ApiService, 
    private messageService: MessageService) { }

  getDeliveryList() : void {
    const dispid = +this.route.snapshot.paramMap.get('dispid');
    this.apiService.getDispatchUnit(dispid)
    .subscribe(res => { 
      console.log('Retrieving dispatch details for '+dispid);
      this.dispatch = res;
      this.shipment = res.delivery;
      console.log(this.dispatch);

      this.pclients = this.dispatch.delivery.map(d => d.delivered === 0 ? d.client : null);
      this.dclients = this.dispatch.delivery.filter(d => d.delivered !== 0 ? d.client : null);

      console.log(this.pclients);
    });
  }

  ngOnInit(): void {
    this.getDeliveryList();
  }

  updateDelivery(): void {
    this.messageService.add('Shipment update');
  }

}
