import { Component } from '@angular/core';
import { NavController, ToastController, ToastOptions, LoadingController } from 'ionic-angular';
import { QuoteService } from "../../services/quotes";
import firebase from "firebase";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { AngularFireAuth } from "angularfire2/auth";
import { WelcomePage } from "../welcome/welcome";
import { AngularFireModule } from 'angularfire2';
import { GooglePlus } from "@ionic-native/google-plus";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TwitterConnect } from '@ionic-native/twitter-connect';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario = {
    photo: '',
    name: ''
  }

  public user:any;
  public error: boolean = false;
  public password: string;

  validacion: FormGroup;
  toastOptions: ToastOptions;

  constructor(private toast: ToastController,
    public navCtrl: NavController,
    public quotes: QuoteService,
    public formBuilder: FormBuilder,
    private fire: AngularFireAuth,
    public googleplus: GooglePlus,
    public tw: TwitterConnect,
    public loadingCtrl: LoadingController,
    private fb: Facebook) {
    this.quotes.getUsers();
    this.validacion = formBuilder.group({
      user: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.pattern('[A-Za-z\d$@$!%*?&]{8,15}$'), Validators.required])]
    })

    this.toastOptions = {
      message: "El usuario o la contraseña no son correctos",
      duration: 2000,

    }

  }

  loginManual(): void {
    //comparaciones de email capturado vs email en el server
    //console.log(this.quotes);
    if (this.user === this.quotes.data.user) {
      if (this.password === this.quotes.data.password) {

        console.log("Todo bien");
        this.error = false;
        this.navCtrl.push(WelcomePage);
      } else {
        //console.log("El usuario o la contraseña no coinciden");
        this.toast.create(this.toastOptions).present();
        this.error = true;
      }
    }
  }


  loginFacebook(): void {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => this.getUserInfo(res.authResponse.userID))
      .catch(e => this.loginFacebookError(e));
  }
  getUserInfo(userId: string) {
    this.fb.api('me?fields=' + ['name', 'first_name', 'last_name', 'picture.type(large)'].join(), null)
      .then((res: any) => this.setFacebookUserInfo(res))
      .catch(e => this.loginFacebookError(e));
  }

  setFacebookUserInfo(user: any) {
    this.user = user;
  }

  loginFacebookError(data: any) {
    console.log(data);
  }


  loginTwitter() {
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    let env = this;
    //Request for login
    this.tw.login().then(function (result) {
      //Get user data
      env.tw.showUser().then(function (user) {
        //Save the user data in NativeStorage
        this.user=
          {
            name: user.name,
            userName: user.screen_name,
            followers: user.followers_count,
            picture: user.profile_image_url_https
          }
      }, function (error) {
        loading.dismiss();
      });
    });

  }

  loginGoogle() {
    this.googleplus.login({})
      .then(res => console.log(res))
      .catch(err=> console.log(err))
  }
}
