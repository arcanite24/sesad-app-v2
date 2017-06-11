import { BackProvider } from './../../providers/back/back';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  private allNotas: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private back: BackProvider,
    private load: LoadingController,
    private toast: ToastController
  ) {
  }

  ionViewDidLoad() {
    let loader = this.load.create({content: 'Cargando notas...'});
    loader.present();
    this.back.getMyNotas().subscribe(
      data => {
        console.log(data);
        
        loader.dismiss();
        this.allNotas = data;
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudieron cargar las notas.', duration: 4000}).present();
      }
    );
  }

}
