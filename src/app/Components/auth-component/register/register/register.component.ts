import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
// private auth=inject(Auth)
// googleAuthProvider=new GoogleAuthProvider()
  registerForm:FormGroup;
constructor(private fb:FormBuilder){
  this.registerForm=this.fb.group({
    registerName:[null],
    registerEmail:[null],
    registerPassword:[null],
  })
}

registersubmit():void{

  console.log(this.registerForm.value)
}
}
