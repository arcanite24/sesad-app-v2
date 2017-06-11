import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { BackProvider } from '../../providers/back/back';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {

  private allReports: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modal: ModalController,
    public toast: ToastController,
    public load: LoadingController,
    public back: BackProvider
  ) {

  }

  ionViewWillLoad() {
    let loader = this.load.create({content: 'Cargando reportes...'});
    loader.present();
    this.back.getMyReportes().subscribe(
      data => {
        this.allReports = data;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudieron cargar los reportes.', duration: 4000}).present();
        this.navCtrl.pop();
      }
    );
  }

  openNewReport() {
    let modalNewReport = this.modal.create('ReportsAddPage');
    modalNewReport.present();
    modalNewReport.onDidDismiss(data => {
      if(!data) return;
      this.ionViewWillLoad();
    });
  }

}
