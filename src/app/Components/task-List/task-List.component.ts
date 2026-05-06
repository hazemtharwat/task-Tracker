import { Component, inject } from '@angular/core';
import { Task } from "../../Core/task's Modul/task's modul";
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TasksService } from '../../Core/services/tasks.service';
@Component({
  selector: 'app-task-List',
  standalone: true,
  imports: [MatIconModule,DatePipe,MatButtonModule,MatBottomSheetModule],
  templateUrl: './task-List.component.html',
  styleUrl: './task-List.component.scss',
})
export class TaskModalComponent {
  tasksList:Task[]=[]
  private _buttomSheet=inject(MatBottomSheet)
  private tasksService=inject(TasksService)
  // tasksList:Task[] = [
  //   {
  //     id: 1,
  //     title: 'Study Angular basics',
  //     date: new Date('2026-05-01'),
  //     done: true,
  //     progress:40
  //   },
  //   {
  //     id: 2,
  //     title: 'Build calendar UI',
  //     date: new Date('2026-05-02'),
  //     done: true,
  //     progress:60
  //   },
  //   {
  //     id: 3,
  //     title: 'Connect Firebase',
  //     date: new Date('2026-05-03'),
  //     done: false,
  //     progress:40
  //   },
  //   {
  //     id: 4,
  //     title: 'Implement add task feature',
  //     date: new Date('2026-05-04'),
  //     done: true,
  //     progress:80
  //   },
  //   {
  //     id: 5,
  //     title: 'Fix bugs in UI',
  //     date: new Date('2026-05-04'),
  //     done: false,
  //     progress:20
  //   }
  // ];
  addNewTask(ev:Event):void{
     this._buttomSheet.open(CreateTaskComponent);

      }
    gettasksData():void{
   this.tasksService.getTasksData().subscribe({
      next:(res)=>{
        this.tasksList=res
        console.log(res)
      }
    });
    }
  deleteTask(item:Task){
//delete task
  }
}
