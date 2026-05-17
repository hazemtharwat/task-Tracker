import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, authState, signOut } from '@angular/fire/auth';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule,MatToolbarModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 private auth=inject(Auth) ;
 private toster=inject(ToastrService)
 private router=inject(Router)
 isLogin:boolean=false;
 
 ngAfterViewInit(): void {
  authState(this.auth).subscribe(res=>{
    this.isLogin=!!res
  })
 }

 logout(){
  signOut(this.auth).then(res=>{
    this.router.navigate(['/auth/login'])
  })
  this.isLogin=false
 }
}
