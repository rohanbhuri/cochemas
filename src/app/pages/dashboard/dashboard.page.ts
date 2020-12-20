import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  cars;

  constructor(
    public firebaseService:FirebaseService
  ) { 
  }

  ngOnInit() {
    this.getWhatsAppData()
  }

  getWhatsAppData(){
    this.firebaseService.db.ref('/whatsappchat-246ad:/WhatsAppCarChat/').once('value').then((snapshot) => {
      // console.log(snapshot.val());
      this.cars = snapshot.val()
      console.log(this.cars);
    });
  }

}
