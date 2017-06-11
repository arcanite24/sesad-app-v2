import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.user = this.navParams.get('user');
    if(!this.user) this.user = {};
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

  close() {
    this.viewCtrl.dismiss();
  }

}
