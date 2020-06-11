import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from '../services/client.service';
import { BillService } from '../services/bill.service';
import { FormGroup, FormControl }  from '@angular/forms';

import { Client } from '../interface/client';
import { Bill } from '../interface/bill';

@Component({
  selector: 'app-bill-editor',
  templateUrl: './bill-editor.component.html',
  styleUrls: ['./bill-editor.component.css']
})
export class BillEditorComponent implements OnInit {
  billForm = new FormGroup({
    client: new FormControl(''),
    count: new FormControl(''),
    discount: new FormControl(''),
  });

  @Input() client: Client;
  bill = {'cost':140, 'mode':''};

  constructor(
    private route : ActivatedRoute,
    private clientService : ClientService,
    private billService : BillService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  updateBill() {
    this.billForm.patchValue({
      client: this.client.name,
      count: this.client.demand,
      discount: 0,
    });
  }

  getClient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(id).subscribe(res => { 
      this.client = res;
      this.updateBill();
    });
  }

  prepayBill() {
    this.bill.mode = 'cash';
  }

  postpayBill() {
    this.bill.mode = 'credit';
  }

  onSubmit() {
    console.warn(this.billForm.value.client);
    console.warn(this.bill);
    console.warn(this.client);
    this.postBill();
  }

  today() {
    let d = new Date();
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  }

  postBill() {
    let bill = {
      'no' : 0,
      'date' : this.today(),
      'client_id' : this.client.id,
      'cost' : this.bill.cost,
      'count': this.billForm.value.count,
      'discount': this.billForm.value.discount,
      'amount': this.billForm.value.count * this.bill.cost * (1-this.billForm.value.discount/100) ,
      'payment': this.bill.mode,
      'status' : this.bill.mode === 'cash' ? 'paid' : 'unpaid',
    };
    console.log('Trying to post ...' + bill);
    this.billService.postBill(bill).subscribe(res => { 
      console.log('Bill posted');
      let success = true;
      if (success) {
        this.client.shipped = true;
      }
      this.location.back();
    });
  }

}
