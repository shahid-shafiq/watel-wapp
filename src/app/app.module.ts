import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { ClientsComponent } from './clients/clients.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BillEditorComponent } from './bill-editor/bill-editor.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    BillDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BillEditorComponent,
    HeaderComponent,
    FooterComponent,
    DispatchComponent,
    ClientListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false}),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
