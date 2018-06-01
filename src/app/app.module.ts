import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {QuoteService} from '../services/quotes';
import {HttpModule} from "@angular/http";
import { Facebook } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from "../pages/welcome/welcome";

import { AngularFireModule } from 'angularfire2';
import firebase from "firebase";

import { AngularFireAuthModule } from 'angularfire2/auth';
/*firebase.initializeApp({
  apiKey: "AIzaSyC7CUs13yPJXnR3LAOdKg7b8iBtGtVvAH0",
  authDomain: "login-24251.firebaseapp.com",
  databaseURL: "https://login-24251.firebaseio.com",
  projectId: "login-24251",
  storageBucket: "login-24251.appspot.com",
  messagingSenderId: "751172793821"
}
);
*/
/*var config = {
  apiKey: "AIzaSyCH8T32YDv6h6AfKkXKZkUTSaF2sJtOuNE",
  authDomain: "multiplataforma-407cc.firebaseapp.com",
  databaseURL: "https://multiplataforma-407cc.firebaseio.com",
  projectId: "multiplataforma-407cc",
  storageBucket: "multiplataforma-407cc.appspot.com",
  messagingSenderId: "256664759942"
};*/
export const firebaseconfig={
  apiKey: "AIzaSyCH8T32YDv6h6AfKkXKZkUTSaF2sJtOuNE",
    authDomain: "multiplataforma-407cc.firebaseapp.com",
    databaseURL: "https://multiplataforma-407cc.firebaseio.com",
    projectId: "multiplataforma-407cc",
    storageBucket: "multiplataforma-407cc.appspot.com",
    messagingSenderId: "256664759942" 
};
firebase.initializeApp(firebaseconfig);
@NgModule({
  declarations: [
    HomePage,
    MyApp,
    WelcomePage
  ],
  imports: [
    BrowserModule,
   //AngularFireModule.initializeApp(config),
   AngularFireAuthModule,
   AngularFireModule.initializeApp(firebaseconfig),
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    QuoteService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook,
    TwitterConnect

  ]
})
export class AppModule {}
