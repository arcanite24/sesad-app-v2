import { BackProvider } from './../../providers/back/back';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController, IonicPage } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public allClases: any[];
  private allAnuncios: any[];

  constructor(
    public navCtrl: NavController,
    public modal: ModalController,
    public auth: AuthProvider,
    public load: LoadingController,
    public back: BackProvider,
    public toast: ToastController
  ) {
    this.allClases = [];
    this.allAnuncios = [];
  }

  openProfile() {
    let profileModal = this.modal.create('ProfilePage', {user: this.auth.user});
    profileModal.present();
  }

  ionViewDidLoad() {
    this.loadHorario();
    this.loadAnuncios();
  }

  loadAnuncios() {
    let loader = this.load.create({content: 'Cargando horario...'});
    loader.present();
    this.back.getAnuncios().subscribe(
      data => {
        loader.dismiss();
        this.allAnuncios = data;
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudieron cargar los anuncios.', duration: 4000}).present();
      }
    );
  }

  loadHorario() {
    let loader = this.load.create({content: 'Cargando horario...'});
    loader.present();
    this.back.getMyHorario().subscribe(
      data => {
        this.allClases = data;
        loader.dismiss();
      },
      err => {
        setTimeout(() => this.ionViewDidLoad(), 1000);
      }
    );
  }

}
