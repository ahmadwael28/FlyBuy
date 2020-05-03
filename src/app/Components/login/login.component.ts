import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      Username: ['',Validators.compose([Validators.required])],
      Password: ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit() { window.localStorage.removeItem('refresh'); }

  loginUser() {
    console.log("login.component.ts");
    this.authService.login(this.loginForm.value)
  }

}
