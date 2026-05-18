import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import interactionPlugin from '@fullcalendar/interaction';
import { TasksService } from '../../Core/services/tasks.service';
import { Task } from '../../Core/task\'s Modul/task\'s modul';
import { take } from 'rxjs';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [FullCalendarModule,MatSidenavModule,MatIconModule],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {
  private tasksService=inject(TasksService)
  tasksList:Task[]=[];
  events:[]=[]
 calendarOptions!:CalendarOptions
 ngOnInit():void{
  this.getTaskList()
 this.handleTasks();


}
 handleTasks() {
   this.calendarOptions = {
  initialView: 'dayGridMonth', 
  weekends: false ,
  plugins: [dayGridPlugin, interactionPlugin],
  events: [
    {
      title: 'Finish Angular Tasks',
      date: '2026-05-14'
    },],
  };
  this.toggleWeekends()
}
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  getTaskList(){
this.tasksService.getTasksData().pipe(take(1)).subscribe({
  next:(res)=>{
    this.tasksList=res
    this.calendarOptions={
      ...this.calendarOptions,
      events:this.tasksList.map(el=>({
        title:el.title,
        date:el.date
      }))
    }
  
  },
  error:(err)=>{
    console.log(err)
  }
})
  }
  handelClickTasks(args:any){
    console.log(this.tasksList +"from handel")
  }
}
