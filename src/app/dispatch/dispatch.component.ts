import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from '../services/client.service';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl }  from '@angular/forms';
import { FormArray, FormBuilder } from'@angular/forms';

import { Client } from '../interface/client';
import { Van } from '../interface/van';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {
  dispatchForm = this.fb.group({
    code: [''],
    date: [this.today()],
    van: [''],
    count: [40],
    client: [''],
  });

  list: Client[] = [];
  members: Client[];
  vans : Van[];

  constructor(
    private fb : FormBuilder,
    private clientService : ClientService,
    private apiService: ApiService
  ) { }

  getClients() : void {
    this.clientService.getClients()
    .subscribe(res => { 
      console.log('service called');
      this.members = res;
    });
  }

  getVans() : void {
    this.apiService.getVans()
    .subscribe(res => { 
      console.log('api service called for vans');
      this.vans = res;
    });
  }

  ngOnInit(): void {
    this.getClients();
    this.getVans();
  }

  pad(n: number, l: number) {
    let s = n.toString();
    return s.padStart(l, '0');
  }

  today() {
    let d = new Date();
    return d.getFullYear() + '-' + this.pad(d.getMonth(),2) + '-' + this.pad(d.getDate(),2);
  }

  compactDate() {
    let d = new Date();
    return d.getFullYear() + '' + this.pad(d.getMonth(),2) + '' + this.pad(d.getDate(),2);
  }

  newDispatchCode(ix: number) {
    return ('D'+this.pad(this.vans[ix].id,2)+this.compactDate());
  }

  onVanSelect() {
    console.log('Van selected.' + this.newDispatchCode(this.dispatchForm.value.van));
    this.dispatchForm.patchValue({
      code: this.newDispatchCode(this.dispatchForm.value.van),
      count : this.vans[this.dispatchForm.value.van].capacity});
  }

  addClient() {
    let idx = this.dispatchForm.value.client;

    let f = this.members.filter( el => el.id == idx);
    this.list.push(f[0]);

    this.members = this.members.filter( el => el.id != idx);
  }

  onSubmit() {
    let data = {
      'ui': this.dispatchForm.value,
      'clients': this.list,
      'van' : this.vans[this.dispatchForm.value.van],
    };

    let dispatch = {
      'dispatchcode' : this.dispatchForm.value.code,
      'date' : this.dispatchForm.value.date,
      'van_id' : this.vans[this.dispatchForm.value.van].id,
      'count' : this.dispatchForm.value.count,
    }
    this.apiService.createDispatch(dispatch).subscribe(res => {
      console.log(res.message);
      if (this.list.length) {
        console.log('saving delivery clients');
        this.list.map(cl => {
          let del = {
            'client_id': cl.id,
            'dispatch_id' : res.dispatch_id,
            'count' : cl.demand,
          };
          console.log(del);
          this.apiService.addDelivery(del).subscribe(res => {
            console.log(res.message + ' ' + res.delivery_id);
          });
        });
      }
    });

    console.log(data);

  }



}
