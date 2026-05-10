import { CreateTaskComponent } from './../create-task/create-task.component';
import { Component, inject } from '@angular/core';
import { Task } from "../../Core/task's Modul/task's modul";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatBottomSheet,MatBottomSheetModule,} from '@angular/material/bottom-sheet';
import { TasksService } from '../../Core/services/tasks.service';
import { Timestamp } from '@angular/fire/firestore';
import { take } from 'rxjs';
import { FormArray, FormBuilder } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-task-List',
  standalone: true,
  imports: [CommonModule,MatIconModule, DatePipe, MatButtonModule, MatBottomSheetModule,MatDividerModule],
  templateUrl: './task-List.component.html',
  styleUrl: './task-List.component.scss',
})
export class TaskModalComponent {

  tasksList: Task[] = [];
  taskForm:any;
  private _buttomSheet = inject(MatBottomSheet);
  private tasksService = inject(TasksService);
  private fb=inject(FormBuilder)
 
  addNewTask(ev: Event): void {
    this._buttomSheet.open(CreateTaskComponent);
  }
  ngOnInit(): void {
   this.getTasksData()
    this.tasksService.tasksFromList$.subscribe(res=>{
      this.taskForm=res
    })
  }
  getTasksData(): void {
    if (!this.tasksService) {
      this.tasksList = [
        {
          title: 'Study Angular basics',
          date: new Date('2026-05-01'),
          done: true,
          progress: 40,
          Priority: 'Low',
        },
        {
          title: 'Build calendar UI',
          date: new Date('2026-05-02'),
          done: true,
          progress: 60,
          Priority: 'Hight',
        },
        {
          title: 'Connect Firebase',
          date: new Date('2026-05-03'),
          done: false,
          progress: 40,
          Priority: 'low',
        },
      ];
    } else {
      this.tasksList=[]
      this.tasksService.getTasksData().pipe(take(1)).subscribe({
        next: (res) => {
          this.tasksList = res.map(x => {
            return {
              ...x,
              date: new Date((x.date as Timestamp).seconds * 1000)
            }
          });
          console.log(res);
        },
      });
    }
  }
  get getTasksList():FormArray{
  return this.taskForm as FormArray
  }
  patchValue(ev:Event){
   this._buttomSheet.open(CreateTaskComponent);
    this.tasksService.getTasksData().pipe(take(1)).subscribe({
      next:(res)=>{
      // this.getTasksList.clear();
        res.forEach(el=>{
          this.getTasksList.push(
            this.fb.group({
              title:[el.title],
              date:[el.date],
              done:[el.done],
              progress:[el.progress],
              Priority:[el.Priority],
            })
          )
        })
      }
    })
  }
  // updateItem(item:Event){

  //   this.tasksService.updateItem(item).pipe(take(1)).subscribe({
  //     next:(res)=>{
  //       console.log(res)
  //     }
  //   })
  // }
  deleteTask(item: string) {
    this.tasksService.deleteItem(item);
    console.log('item deleted')
  }

}
