import { Component } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { QuoteService } from "../../services/quotes";
import firebase from "firebase";
import { WelcomePage } from "../welcome/welcome";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user:string;
  public error:boolean=false;
  public password:string;

  validacion:FormGroup;
  toastOptions: ToastOptions; 

  constructor(private toast: ToastController, public navCtrl: NavController, public quotes:QuoteService, public formBuilder: FormBuilder) {
    this.quotes.getUsers();
    this.validacion = formBuilder.group({
      user: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'),Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.pattern('[A-Za-z\d$@$!%*?&]{8,15}$'), Validators.required])]
    })
 
    this.toastOptions = {
       message:"El usuario o la contraseña no son correctos",
       duration : 2000,

    }
  
  }
   
  loginManual():void{
      //comparaciones de email capturado vs email en el server
      //console.log(this.quotes);
      if(this.user===this.quotes.data.user){
        if(this.password === this.quotes.data.password){
       
        console.log("Todo bien");
        this.error=false;
        this.navCtrl.push(WelcomePage);
      }else{
        //console.log("El usuario o la contraseña no coinciden");
        this.toast.create(this.toastOptions).present();
       this.error=true;
      }
  }
}


   loginFacebook():void{
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));
      }).catch(function(error){
        alert(JSON.stringify(error))
      });
    });
  }

  loginTwitter():void{}
loginGoogle():void{}
}


