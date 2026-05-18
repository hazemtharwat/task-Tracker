import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskModalComponent } from '../../Components/task-List/task-List.component';
import { CalendarPageComponent } from '../../Components/calendar-page/calendar-page.component';

const routes: Routes = [
  {path:'',component:TaskModalComponent},
  {path:'home',component:TaskModalComponent},
  {path:'tasks',component:TaskModalComponent},
  {path:'calendar',component:CalendarPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
