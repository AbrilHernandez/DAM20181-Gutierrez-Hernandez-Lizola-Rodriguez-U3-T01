import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {QuoteService} from '../services/quotes';
import {HttpModule} from "@angular/http";

import { GooglePlus } from "@ionic-native/google-plus";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from "../pages/welcome/welcome";

import { AngularFireModule } from 'angularfire2';
import firebase from "firebase";

import { AngularFireAuthModule } from 'angularfire2/auth';

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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
