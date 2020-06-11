import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { BillEditorComponent } from './bill-editor/bill-editor.component';


const routes : Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'billclient/:id', component: BillEditorComponent },
  { path: 'client/:id', component: BillDetailComponent },
  { path: 'clients', component: ClientsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
