import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  GoogleAuthProvider,
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSubmtionSuccess: boolean = false;
  errorMasseg: string = '';
  loginForm!: FormGroup;

  private auth = inject(Auth);
  private route = inject(Router);
  googleAuthProvider = new GoogleAuthProvider();
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginEmail: [null],
      loginPassword: [null],
    });
  }
  ngOninit(): void {}
  loginsubmit(): void {
    const formValue = this.loginForm.value;
    signInWithEmailAndPassword(
      this.auth,
      formValue.loginEmail,
      formValue.loginPassword,
    )
      .then((res) => {
        this.isSubmtionSuccess = true;
        this.navgateToDashbord();
        console.log(this.loginForm.value);
      })
      .catch((err) => {
        this.errorMasseg = err;
      });
  }
  singinWithGoogle() {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      signInWithPopup(this.auth, this.googleAuthProvider).then((res) => {
        this.navgateToDashbord();
        console.log(res + 'google sign in');
      });
    }

    if (isMobile) {
      signInWithRedirect(this.auth, this.googleAuthProvider).then((res) => {
        this.navgateToDashbord();
        console.log(res + 'google sign in');
      });
    }
  }
  navgateToDashbord() {
    this.route.navigate(['./dashbord']);
  }
}
