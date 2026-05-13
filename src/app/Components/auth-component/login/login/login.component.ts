import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup;
constructor(private fb:FormBuilder){}
ngOninit():void{
 this.loginForm= this.fb.group({
  loginEmail:[null],
  loginPassword:[null],
 })
}
}
