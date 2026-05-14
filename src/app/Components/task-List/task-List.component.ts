import { CreateTaskComponent } from './../create-task/create-task.component';
import { Component, inject } from '@angular/core';
import { Task } from "../../Core/task's Modul/task's modul";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { TasksService } from '../../Core/services/tasks.service';
import { findIndex, take } from 'rxjs';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ToastrService } from 'ngx-toastr';
import { title } from 'node:process';

@Component({
  selector: 'app-task-List',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    DatePipe,
    MatButtonModule,
    MatBottomSheetModule,
    MatDividerModule,
  ],
  templateUrl: './task-List.component.html',
  styleUrl: './task-List.component.scss',
})
export class TaskModalComponent {
  private toster = inject(ToastrService);
  tasksList: Task[] | any = [];
  taskForm: any;
  itemData:any;
    private _buttomSheet = inject(MatBottomSheet);
  private tasksService = inject(TasksService);
  private fb = inject(FormBuilder);

  addNewTask(ev: Event): void {
    this._buttomSheet.open(CreateTaskComponent);
  }
  ngOnInit(): void {
    this.getTasksData();
    this.tasksService.tasksFromList$.subscribe((res) => {
      if (res) {
        this.tasksList = [...this.tasksList,...res];
      }
    });
  }
  enableIsDoneItems(id:Task,data:Task){
    data.done=true
     this.tasksService.updateItem(id,data).then(res=>{
      // this.tasksList=[...this.tasksList,...data.done=true]

    }).catch(err=>{console.log(err+"error mode")})
  }

  disableIsDoneItems(id:Task,data:Task){
    data.done=false
    this.tasksService.updateItem(id,data).then(res=>{



    }).catch(err=>{console.log(err+"error mode")})
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
          Priority: 'High',
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
      this.tasksList = [];
      this.tasksService
        .getTasksData()
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.tasksList = res;
          },
        });
    }
  }

  patchValue(index: number) {
    const itemindex=index
    const item=this.tasksList[itemindex]
  this.itemData= this._buttomSheet.open(CreateTaskComponent,{data:{item,index}});
  this.itemData.afterDismissed().subscribe((res:any)=>{
  this.tasksList[res.index]={
    ...this.tasksList[res.index],
    ...res.item
  };
  this.tasksService.updateItem(this.tasksList[res.index].id,this.tasksList[res.index])
  console.log( {data:this.tasksList[res.index]})
})
  }
  deleteTask(id: string) {
    if (!id) {
    }
    this.tasksService
      .deleteItem(id)
      .then(() => {
        this.tasksList = this.tasksList.filter((el: any) => {
          return el.id != id;
        });
        this.toster.warning('deleted');
      })
      .catch((err) => {
        this.toster.error(err);
      });
  }
}
