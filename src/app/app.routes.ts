import { Routes } from '@angular/router';
import { NotfoundComponent } from './Components/notfound/notfound.component';
export const routes: Routes = [
    {path:'',redirectTo:'auth',pathMatch:"full"},
    {path:'auth',loadChildren:()=>import('./Core/auth/auth-routing.module').then(m=>m.AuthRoutingModule)},
    // {path:'login',component:LoginComponent},
    // {path:'register',component:RegisterComponent},
    {path:'dashbord',loadChildren:()=>import('./Core/dashbord/dashbord-routing.module').then(m=>m.DashbordRoutingModule)},
    {path:'**',component:NotfoundComponent},
];
