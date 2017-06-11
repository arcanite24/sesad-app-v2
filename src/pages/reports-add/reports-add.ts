import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';

import { BackProvider } from '../../providers/back/back';

@IonicPage()
@Component({
  selector: 'page-reports-add',
  templateUrl: 'reports-add.html',
})
export class ReportsAddPage {

  private allItems: Array<any>;
  private addReporteData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public back: BackProvider,
    public load: LoadingController,
    public toast: ToastController,
    public view: ViewController,
    public auth: AuthProvider
  ) {
    this.allItems = [];
    this.addReporteData = {};
  }

  ionViewWillLoad() {
    let loader = this.load.create({content: 'Cargando inventario...'});
    loader.present();
    this.back.getAllItems().subscribe(
      data => {
        this.allItems = data;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudo cargar el inventario...', duration: 3000});
        this.view.dismiss();
      }
    );
  }

  addReporte() {
    let loader = this.load.create({content: 'Cargando inventario...'});
    loader.present();
    this.addReporteData.user = this.auth.user.id;
    this.back.addReporte(this.addReporteData).subscribe(
      data => {
        console.log(data);
        
        loader.dismiss();
        this.toast.create({message: 'Reporte agregado correctamente...', duration: 3000});
        this.view.dismiss(data);
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudo agregar el reporte...', duration: 3000});
        this.view.dismiss();
      }
    );
  }

  close() {
    this.view.dismiss();
  }

}
