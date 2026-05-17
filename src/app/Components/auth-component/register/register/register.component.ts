import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
private auth=inject(Auth)
private router=inject(Router)
private toster=inject(ToastrService)
private firestore=inject(Firestore)
googleAuthProvider=new GoogleAuthProvider()
  registerForm:FormGroup;
constructor(private fb:FormBuilder){
  this.registerForm=this.fb.group({
    registerName:['',[Validators.required]],
    registerEmail:['',[Validators.required]],
    registerPassword:['',[Validators.required]],
  })
}

registersubmit():void{
if(this.registerForm.invalid){
this.registerForm.markAllAsTouched()
}
if(this.registerForm.valid){
   const formValue=this.registerForm.value
 createUserWithEmailAndPassword(this.auth,formValue.registerEmail,formValue.registerPassword).then(res=>{
    const userid=res.user.uid

 setDoc(doc(this.firestore,`users/${userid}`),{
      registerName:res.user.displayName,
      registerEmail: res.user.email,
      createdAt: new Date()
    })

      this.router.navigate(['./dashbord'])
}).catch(err=>{
    this.toster.error(err)
    console.log(err)
})

}
}
signUpwithGoogle(){
  signInWithPopup(this.auth,this.googleAuthProvider).then(res=>{
    const userid=res.user.uid

  const Data=  setDoc(doc(this.firestore,`users/${userid}`),{
      registerName:res.user.displayName,
      registerEmail: res.user.email,
      createdAt: new Date()
    })
        console.log(Data)
    this.router.navigate(['./dashbord'])
  }).catch(err=>{
    this.toster.error(err)
    console.log(err)

  })
}
}
