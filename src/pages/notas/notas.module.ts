import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotasPage } from './notas';

@NgModule({
  declarations: [
    NotasPage,
  ],
  imports: [
    IonicPageModule.forChild(NotasPage),
  ],
  exports: [
    NotasPage
  ]
})
export class NotasPageModule {}
