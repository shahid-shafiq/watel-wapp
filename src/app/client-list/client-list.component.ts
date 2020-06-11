import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../interface/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @Input() clients: Client[];

  constructor() { }

  ngOnInit(): void {
  }

}
