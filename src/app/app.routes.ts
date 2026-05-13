import { Routes } from '@angular/router';
import { TaskModalComponent } from './Components/task-List/task-List.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/auth-component/login/login/login.component';
import { RegisterComponent } from './Components/auth-component/register/register/register.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:"full"},
    {path:'home',component:TaskModalComponent},
    {path:'tasks',component:TaskModalComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'**',component:NotfoundComponent},
];
