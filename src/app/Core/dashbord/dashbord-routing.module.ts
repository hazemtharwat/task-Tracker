import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskModalComponent } from '../../Components/task-List/task-List.component';

const routes: Routes = [
  {path:'',component:TaskModalComponent},
  {path:'home',component:TaskModalComponent},
  {path:'tasks',component:TaskModalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
