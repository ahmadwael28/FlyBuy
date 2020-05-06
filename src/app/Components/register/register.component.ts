import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

const URL = 'http://localhost:3000/Users/upload';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  public uploader: FileUploader = new FileUploader( {
    url: URL,itemAlias: 'image'
  });
  emaiExits;
  usernameExists;
  userAddedSuccMess;
  isValidFormSubmitted: boolean=false;
 
  constructor(private Service: UserService, private router: Router,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }
  registerationForm = new FormGroup({

    Email: new FormControl('', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,4}$"),
    this.ValidateEmail]),//
    Username: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9_-]{3,16}$")]),
    Password: new FormControl('', [Validators.required, Validators.minLength(8),
    Validators.maxLength(16)]),
    ConfirmPassword: new FormControl('', [Validators.required]),
    Gender: new FormControl('',[Validators.required])

  },
    {
      validators: this.CheckMatchedPasswords.bind(this)
    })
    UniqueUsername(formGroup: FormGroup) {
      console.log("inside Unique Username");
      const usernameContrl = formGroup.get('Username');
      console.log(usernameContrl);
      if (usernameContrl.errors == null) {
  
        console.log('check if username exists by sending request to server')
  
        let observable = this?.Service?.isUsernameExists(usernameContrl.value);
        let dispose = observable.subscribe(async (data) => {
          console.log(data);
          this.usernameExists = data;
          if (this.usernameExists != undefined && this.usernameExists.exists == true) {
            console.log('Exists...');
            usernameContrl.setErrors({ 'alreadyExists': true });
  
  
          }
  
          console.log(usernameContrl.errors)
  
          dispose.unsubscribe();
  
        },
          (err) => {
            console.log(err);
  
          });
  
      }
  
    }
  UniqueEmail(formGroup: FormGroup) {
    console.log("inside Unique Email");
    const emailContrl = formGroup.get('Email');
    console.log(emailContrl);
    if (emailContrl.errors == null) {

      console.log('check if email exists by sending request to server')

      let observable = this?.Service?.isEmailExists(emailContrl.value);
      let dispose = observable.subscribe(async (data) => {
        console.log(data);
        this.emaiExits = data;
        if (this.emaiExits != undefined && this.emaiExits.exists == true) {
          console.log('Exists...');
          emailContrl.setErrors({ 'alreadyExists': true });


        }

        console.log(emailContrl.errors)

        dispose.unsubscribe();

      },
        (err) => {
          console.log(err);

        });

    }

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
  CheckMatchedPasswords(formGroup: FormGroup) {
    const passwordContrl = formGroup.get('Password');
    const confirmPasswordContrl = formGroup.get('ConfirmPassword');
    console.log(confirmPasswordContrl.value)

    if (passwordContrl.value === confirmPasswordContrl.value) {
      //console.log('Matched..');
      return confirmPasswordContrl.setErrors(null);

    }
    return confirmPasswordContrl.setErrors({ passwordMismatch: true });

  }


  get Username() { return this.registerationForm.get('Username') }
  get Email() { return this.registerationForm.get('Email') }
  get Password() { return this.registerationForm.get('Password') }
  get ConfirmPassword() { return this.registerationForm.get('ConfirmPassword') }
  get Gender() { return this.registerationForm.get('Gender') }
  get isValid() { return this.registerationForm.valid }

  addUser() {
    console.log('AddUser is Invoked...');
    this.isValidFormSubmitted=true;
    if (this.registerationForm.valid) { ///false
      console.log(this.registerationForm.value);
      let {Email,Username,Password,Gender} = this.registerationForm.value;
     
      let observable = this.Service.AddUser({"Email":Email,"Username":Username,"Password":Password,"Gender":Gender})
      let dispose = observable.subscribe((data) => {
        console.log(data);
        this.userAddedSuccMess = data;
        if (this.userAddedSuccMess) {
          console.log("User Added Successfully!")
          this.router.navigateByUrl('');
        }

        dispose.unsubscribe();

      },
        (err) => {
          console.log(err);
          //  return null;
        });
     

    }
  }

}
