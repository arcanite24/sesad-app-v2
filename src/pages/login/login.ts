import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loader: boolean;
  private loginData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public auth: AuthProvider,
    public storage: Storage
  )
  {
    this.loader = false;
    this.loginData = {
      username: '',
      password: ''
    };
    this.storage.get('user').then(user => {
      if(user) {
        this.auth.setUser(JSON.parse(user));
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  login(username: string, password: string) {
    this.loader = true;
    this.auth.login(username, password).subscribe(
      data => {
        if(data.err) {
          this.toast.create({message: data.err, duration: 4000}).present();
          this.loader = false;
        } else {
          this.auth.saveUser(data.user, dataSave => {
            if(dataSave.err) return this.toast.create({message: 'Error, no se pudo guardar la sesión.', duration: 2000});
            this.toast.create({message: 'Sesión iniciada correctamente.', duration: 4000}).present();
            this.navCtrl.setRoot(HomePage);
            this.loader = false;
          });

        }
      },
      err => {
        this.loader = false;
        this.toast.create({message: 'Error, no se pudo iniciar sesión.', duration: 4000}).present();
      }
    );
    setTimeout(() => this.loader = false, 2000);
  }

}
