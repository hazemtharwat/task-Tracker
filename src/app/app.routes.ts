import { Routes, CanActivateFn } from '@angular/router';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { authGuard } from './Core/auth/auth.guard';
import { blankGuard } from './Core/dashbord/blank.guard';
export const routes: Routes = [
    {path:'',redirectTo:'auth',pathMatch:"full"},
    {path:'dashbord',loadChildren:()=>import('./Core/dashbord/dashbord-routing.module').then(m=>m.DashbordRoutingModule),canActivate:[authGuard]},
    {path:'auth',loadChildren:()=>import('./Core/auth/auth-routing.module').then(m=>m.AuthRoutingModule),canActivate:[blankGuard]},
    // {path:'login',component:LoginComponent},
    // {path:'register',component:RegisterComponent},
    // {path:'',redirectTo:'dashbord',pathMatch:"full"},
    {path:'**',component:NotfoundComponent},
];
