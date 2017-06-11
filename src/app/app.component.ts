import { AuthProvider } from './../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') navCtrl: NavController;

  public user: any;
  public homePage: any = "HomePage";
  public profilePage: any = "ProfilePage";
  public reportsPage: any = "ReportsPage";
  public tareasPage: any = "TareasPage";
  public notasPage: any = "NotasPage";

  rootPage:any = this.homePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage,
    public menu: MenuController,
    public modal: ModalController,
    private auth: AuthProvider
  ) {
    this.user = {};
    this.storage.get('user').then(user => {
      this.user = JSON.parse(user);
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: any) {
    if(page == 'HomePage') {
      this.navCtrl.setRoot(page);
    } else {
      this.navCtrl.push(page);
    }
    this.menu.close();
  }

  openProfile() {
    let profileModal = this.modal.create('ProfilePage', {user: this.user});
    profileModal.present();
  }

  getStyledRoles(roles: Array<any>) {
    if(!roles) return 'Cargando...';
    let tempRoles = roles.map(role => {
      if(role == 'ROLE_ADMIN') return 'Administrador';
      if(role == 'ROLE_ALUMNO') return 'Alumno';
      if(role == 'ROLE_PROFESOR') return 'Profesor';
    });
    return tempRoles.join(', ');
  }

  logout() {
    this.auth.logout(() => {{this.navCtrl.setRoot('LoginPage'); this.menu.close()}});
  }

}

