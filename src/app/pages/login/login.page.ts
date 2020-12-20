import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  constructor(
    public firebaseService:FirebaseService
  ) {
    this.firebaseService.loginWithFirebase();
   }

  ngOnInit() {

  }  

}
