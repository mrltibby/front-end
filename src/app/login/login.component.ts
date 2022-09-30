import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  constructor(public router: Router) {}

  ngOnInit(): void {}

  login() {
    // TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyCRDMrr9fhO9hH1_OFmlv-BOzfsmy8D3Sg',
      authDomain: 'bionicwebapp.firebaseapp.com',
      databaseURL:
        'https://bionicwebapp-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'bionicwebapp',
      storageBucket: 'bionicwebapp.appspot.com',
      messagingSenderId: '49326962456',
      appId: '1:49326962456:web:ff333abe85c26c53d6506d',
      measurementId: 'G-H9G63HPD7M',
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, ""+this.email.value, ""+this.password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.router.navigate(["/","user"]);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }
    
}
