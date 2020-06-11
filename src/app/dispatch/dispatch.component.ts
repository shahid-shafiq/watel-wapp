import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from '../services/client.service';
import { FormGroup, FormControl }  from '@angular/forms';
import { FormArray, FormBuilder } from'@angular/forms';

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
    clients : this.fb.array([
      this.fb.control('')
    ])
  });

  clientlist: any[];

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
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

  newDispatchCode(vid: number) {
    return ('D'+this.pad(vid,2)+this.compactDate());
  }

  onVanSelect() {
    console.log('Van selected.' + this.newDispatchCode(this.dispatchForm.value.van));
    this.dispatchForm.patchValue({code: this.newDispatchCode(this.dispatchForm.value.van)});
  }

  get clients() {
    return this.dispatchForm.get('clients') as FormArray;
  }

  addClient() {
    this.clients.push(this.fb.control(''));
  }

  onSubmit() {

  }



}
