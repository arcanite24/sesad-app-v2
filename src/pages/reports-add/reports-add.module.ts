import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportsAddPage } from './reports-add';

@NgModule({
  declarations: [
    ReportsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportsAddPage),
  ],
  exports: [
    ReportsAddPage
  ]
})
export class ReportsAddPageModule {}
