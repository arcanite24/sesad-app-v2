import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TareasPage } from './tareas';

@NgModule({
  declarations: [
    TareasPage,
  ],
  imports: [
    IonicPageModule.forChild(TareasPage),
  ],
  exports: [
    TareasPage
  ]
})
export class TareasPageModule {}
