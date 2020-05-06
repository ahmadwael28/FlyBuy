import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  isDataEntered: boolean = false;
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    //this.isDataEntered=true;
    this.loginForm = new FormGroup({
     Email : new FormControl('', [Validators.required,this.ValidateEmail,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
     Password: new FormControl('',[Validators.required])
    })
  }
  ValidateEmail(control: AbstractControl)//AbstractControl>>Parent of Form Controls
  {
  
    let email = control.value; 
    if (email && email.indexOf("@") != -1) { 
    
      let [, domain] = email.split("@"); 
      if (!domain.includes('.com')) { //check domain 
          return { validEmailDomain: true };
      }
    return null;//validation passes
    }
  }
  get formControls() {
    return this.loginForm.controls;
  }

  get emailStatus() {
    return this.loginForm.get('Email');
  }

  get passwordStatus() {
    return this.loginForm.get('Password')
  }
  get enteredSuccessfully() {
    return this.loginForm.valid
  }
  ngOnInit() { window.localStorage.removeItem('refresh'); }

  loginUser() {
    console.log("login.component.ts");
    this.isSubmitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    this.authService.login(this.loginForm.value)
  }

}
