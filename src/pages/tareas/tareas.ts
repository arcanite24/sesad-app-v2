import { BackProvider } from './../../providers/back/back';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the TareasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tareas',
  templateUrl: 'tareas.html',
})
export class TareasPage {

  private allTareas: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private back: BackProvider,
    private load: LoadingController,
    private toast: ToastController
  ) {
    this.allTareas = [];
  }

  ionViewDidLoad() {
    let loader = this.load.create({content: 'Cargando tareas...'});
    loader.present();
    this.back.getAllTareasAlumno().subscribe(
      data => {
        loader.dismiss();
        this.allTareas = data;
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudieron cargar los reportes.', duration: 4000}).present();
      }
    );
  }

}
