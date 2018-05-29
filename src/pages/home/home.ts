import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireAuth } from "angularfire2/auth";

import { AngularFireModule } from 'angularfire2';
import { GooglePlus } from "@ionic-native/google-plus";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public imagen:String;
  constructor(public navCtrl: NavController, private fire:AngularFireAuth,public googleplus:GooglePlus) {

  }

  loginFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));
      }).catch(function(error){
        alert(JSON.stringify(error))
      });
    });
  }
  loginTwitter(){
    this.fire.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider()).then(res =>{
      console.log(res);
    console.log(res.additionalUserInfo.profile.profile_image_url_https);
    this.imagen=res.additionalUserInfo.profile.profile_image_url_https;
    })

  }
  loginGoogle(){
    this.googleplus.login({
      'webCleint':'256664759942-acs1qqgm9co1bqaa59qn883e355r6itq.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc =>{
        alert("LOGIN")
      }).catch(ns =>{
        alert("NOT FOUNT")
      })
    })
  }
}
