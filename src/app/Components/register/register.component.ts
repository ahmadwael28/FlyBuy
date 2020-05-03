import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
  }
  registerationForm = new FormGroup({
    Name: new FormControl('',[Validators.required,Validators.required,Validators.minLength(10),
      Validators.pattern("^[\sa-zA-Z-]*$")]),
    Email : new FormControl('', [Validators.required,Validators.email]),
    Username: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9_-]{3,16}$")]),
    Password: new FormControl('',[Validators.required,Validators.minLength(6),
      Validators.maxLength(30)]),
    ConfirmPassword: new FormControl('', [ Validators.required, Validators.minLength(6),
       Validators.maxLength(30)])

  },
  { 
    validators: this.password.bind(this)
  })
  password(formGroup: FormGroup) 
  {
    const { value: password } = formGroup.get('Password');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  addUser()
  {

  }

}
