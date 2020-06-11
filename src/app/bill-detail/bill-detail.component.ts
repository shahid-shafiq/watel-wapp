import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from '../services/client.service';

import { Client } from '../interface/client';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit {

  @Input() client: Client;

  constructor(
    private route : ActivatedRoute,
    private clientService : ClientService, 
    private location : Location
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(id).subscribe(res => this.client = res);
  }

  save() : void {
    //this.clientService.update
  }

}
