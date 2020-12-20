import { Injectable } from "@angular/core";
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  firebaseui = window["firebaseui"];
  firebase = window["firebase"];
  db = this.firebase.database();
  ui = new this.firebaseui.auth.AuthUI(this.firebase.auth());
  user;

  constructor(
    private navController: NavController,
    public toastController: ToastController
  ) {}

  loginWithFirebase() {

    let uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
        uiShown: () => {
          // The widget is rendered.
          // Hide the loader.
          setTimeout(() => {
            document.getElementById("ui-container").style.opacity = "1";
          }, 500);
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      // signInFlow: 'popup',
      // signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
        this.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>",
      // Privacy policy url.
      privacyPolicyUrl: "<your-privacy-policy-url>",
    };

    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        document.getElementById("ui-container").style.opacity = "0";
        this.navController.navigateRoot(['/dashboard']);
      } else {
        // No user is signed in.
        console.log("no user", user);
        setTimeout(() => {
          this.ui.start("#firebaseui-auth-container", uiConfig);          
        }, 1000);
      }
    });
  }


  logout(){ 
    this.firebase.auth().signOut().then(() => {
    this.user = undefined
    this.navController.navigateRoot(['/login']);
		}).catch((error) => {
			// An error happened.
			console.log(error)
		});
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
        message: msg,
        duration: 2000
    });
    toast.present();
}
  
}
