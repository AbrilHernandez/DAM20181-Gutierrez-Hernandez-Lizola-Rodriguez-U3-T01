import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QuoteService } from "../../services/quotes";
import { GooglePlus } from "@ionic-native/google-plus";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
}) 
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public quotes:QuoteService,public googlePlus:GooglePlus) {
    console.log(this.quotes.data);
  }
  ionViewDidLoad() {
   
  }
  logout(){
    this.googlePlus.disconnect()
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

}
