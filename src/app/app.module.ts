import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {QuoteService} from '../services/quotes';
import {HttpModule} from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from "../pages/welcome/welcome";

import firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyC7CUs13yPJXnR3LAOdKg7b8iBtGtVvAH0",
  authDomain: "login-24251.firebaseapp.com",
  databaseURL: "https://login-24251.firebaseio.com",
  projectId: "login-24251",
  storageBucket: "login-24251.appspot.com",
  messagingSenderId: "751172793821"
}
);

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    WelcomePage
    
  ],
  imports: [
    BrowserModule,
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
    QuoteService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
