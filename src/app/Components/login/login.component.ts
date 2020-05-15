import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailExits;
  passwordCorrect;
  isSubmitted = false;
  isDataEntered: boolean = false;
  isLoggedInChecked: boolean = true;
  passedCredentials;
  constructor(public authService: AuthService,public router: Router,private userService: UserService) {
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
      var re = /^[A-Za-z.]+$/;
      if (!(domain.includes('.com') || domain.includes('.eg')) || email.indexOf(".") <= (email.indexOf("@") + 5) || !re.test(domain)) { //check domain 
        return { validEmailDomain: true };

      }

      return null;//validation passes
    }
  }
   async validateCredentials()
   {
     if(this.loginForm.valid)
     {
       console.log("inside validate credentials..")
      this.passedCredentials = await this.authService.ValidateCredentials(this.loginForm.value);
     }
   }
  doesEmailExist(formGroup: FormGroup) {
    const emailControl = formGroup.get('Email');
    console.log(emailControl);
    if (emailControl.errors == null) {

      console.log('check if email exists by sending request to server')

      let observable = this?.userService?.isEmailExists(emailControl.value);
      let dispose = observable.subscribe(async (data) => {
        console.log(data);
        this.emailExits = data;
        if ( this.emailExits.exists == false) {
          console.log('Does Not Exist...');
          emailControl.setErrors({ 'doesNotExist': true });
        }
        console.log(emailControl.errors)
        dispose.unsubscribe();
      },
        (err) => {
          console.log("Invalid Email or Password",err);
        });
    }

  }
  doesPasswordMatch(formGroup: FormGroup) {
    const passwordControl = formGroup.get('Password');
    console.log(passwordControl);
    if (passwordControl.errors == null) {

      console.log('check if Password exists by sending request to server')

      let observable = this?.userService?.isPasswordCorrect(passwordControl.value);
      let dispose = observable.subscribe(async (data) => {
        console.log(data);
        this.passwordCorrect = data;
        if ( this.passwordCorrect.correct == false) {
          console.log('Does Not Match...');
          passwordControl.setErrors({ 'doesNotMatch': true });

        }

        console.log(passwordControl.errors)

        dispose.unsubscribe();

      },
        (err) => {
          console.log("Invalid Email or Password",err);

        });

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

  async loginUser() {
    console.log("login.component.ts");
    this.isSubmitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    let r=this.authService.login(this.loginForm.value);
    console.log("r",r);
    if(this.authService.currentUser.Email==this.loginForm.get('Email'))
    {
      this.passedCredentials=true;
    }
    else{
      this.passedCredentials=false;
    }
    // if(this.isSubmitted)
    // {
    //   if (this.isLoggedInChecked)
    //   {
    //     console.log(" checked")
    //     this.router.navigateByUrl('/Login');
    //     this.isSubmitted = false;
    //   }
    //   if (!this.isLoggedInChecked)
    //   {
    //     console.log("not checked");
    //     this.authService.login(this.loginForm.value);
  
    //   }
  }
    
  // console.log("this.passedCredentials",this.passedCredentials);
  //  if(this.passedCredentials)
  //  {
  //    console.log("Correct Dredentials");
  //  }
  //  else{
  //   console.log("Wrong Dredentials");

  //  }
  }


