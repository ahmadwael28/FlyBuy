import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-edit-user-info-modal',
  templateUrl: './edit-user-info-modal.component.html',
  styleUrls: ['./edit-user-info-modal.component.css'],
  template: `<body #body>Some text</body>`,
})
export class EditUserInfoModalComponent implements OnInit {
  @ViewChild('body') body: ElementRef;

  @Input()  ShowModal;
  @Input() currentUser;

  URL = 'http://localhost:3000/Users/upload';
  public uploader: FileUploader = new FileUploader({
    url: this.URL, itemAlias: 'photo'
  });
  emaiExits;
  usernameExists;
  userAddedSuccMess;
  isValidFormSubmitted: boolean = false;
  fileItem;
  fileValue: string = "";
  isLoggedInChecked: boolean = false;


  constructor(private Service: UserService, private router: Router, private toastr: ToastrService,
    private auth: AuthService) {
  }

  ngOnInit(): void {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {

      ("OnComplete Upload...");
      this.fileItem = item;
      console.log('Uploaded File Details:', item);
      this.editUser();
      
    };
    

  }

  ngOnChanges(changes: SimpleChanges) {

    this.registerationForm.controls['Username'].setValue(this.currentUser.Username);
    this.registerationForm.controls['Email'].setValue(this.currentUser.Email);
    this.registerationForm.controls['Gender'].setValue(this.currentUser.Gender);

}

  registerationForm = new FormGroup({

    Email: new FormControl('', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,4}$"),this.ValidateEmail]),
    Username: new FormControl( '', [Validators.required, Validators.pattern("^[a-z0-9_-]{3,16}$")]),
    Gender: new FormControl('', [Validators.required])

  })

  UniqueUsername(formGroup: FormGroup) {
    console.log("inside Unique Username");
    const usernameContrl = formGroup.get('Username');
    console.log(usernameContrl);
    if (usernameContrl.errors == null) {

      console.log('check if username exists by sending request to server')

      if(usernameContrl.value != this.currentUser.Username)
      {
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

  }
  UniqueEmail(formGroup: FormGroup) {
    console.log("inside Unique Email");
    const emailContrl = formGroup.get('Email');
    console.log(emailContrl);
    if (emailContrl.errors == null) {

      console.log('check if email exists by sending request to server')

      if(emailContrl.value != this.currentUser.Email)
      {
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

  }

  ValidateEmail(control: AbstractControl)//AbstractControl>>Parent of Form Controls
  {

    let email = control.value;
    if (email && email.indexOf("@") != -1) {

      let [, domain] = email.split("@");
      var re = /^[A-Za-z.]+$/;
      if (!domain.includes('.com') || email.indexOf(".") <= (email.indexOf("@") + 5) || !re.test(domain)) { //check domain 
        return { validEmailDomain: true };

      }

      return null;//validation passes
    }
  }


  get Username() { return this.registerationForm.get('Username') }
  get Email() { return this.registerationForm.get('Email') }
  get Gender() { return this.registerationForm.get('Gender') }
  get isValid() { return this.registerationForm.valid }

  onSubmit() {
    console.log("Inside submit..");
    this.isValidFormSubmitted = true;

    console.log("fileValue", this.fileValue);
    console.log(this.fileItem);

    if (this.registerationForm.valid) {
      if (this.fileValue != "") {
        console.log('User chose a photo to upload');
        this.uploader.uploadAll();
      }
      else {
        console.log('No photo is Updated!');
        this.editUser();
      }
    }

  }
  editUser() {
    console.log('EditUser is Invoked...');


    console.log(this.registerationForm.value);
    let { Email, Username, Gender } = this.registerationForm.value;
    let user;
    console.log(this.fileValue);
    if (this.fileValue == "")
      user = {
        "Email": Email, "Username": Username,"Gender": Gender
      };

    else
      user = {
        "Email": Email, "Username": Username,"Gender": Gender, "Image": this.fileItem?.file.name
      };
    let observable = this.Service.EditUser(user);

    let dispose = observable.subscribe((data) => {
      console.log(data);
      this.userAddedSuccMess = data;
      if (this.userAddedSuccMess) {
        console.log("User Added Successfully!");
        if (this.isLoggedInChecked)
          this.auth.login(user);
        else
          this.router.navigateByUrl('/Login');

        

         this.toastr.success('Your account info has been edited successfully!');


      }

      dispose.unsubscribe();

    },
      (err) => {
        console.log(err);

      });


  }

  close()
  {
    (<HTMLBodyElement>document.getElementsByTagName("body")[0]).classList.remove('modal-open');
    (<HTMLCollection>document.getElementsByClassName('modal-backdrop'))[0].remove();
    this.ShowModal = false;
  }

}
