import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  dispatchUnits : any[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDispatchUnits();
  }

  getDispatchUnits() {
    this.apiService.getDispatchUnits().subscribe(res=>{
      console.log(res);
      this.dispatchUnits = res;
    })
  }

}
