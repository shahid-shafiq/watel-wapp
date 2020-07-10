import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {

  @Input() shipment: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
