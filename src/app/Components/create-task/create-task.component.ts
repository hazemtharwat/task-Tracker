import { TasksService } from './../../Core/services/tasks.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TaskModalComponent } from '../task-List/task-List.component';
import { Task } from '../../Core/task\'s Modul/task\'s modul';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [MatSelectModule,MatButtonModule,MatBottomSheetModule,MatIconModule,FormsModule,ReactiveFormsModule,MatDatepickerModule,MatFormFieldModule,MatInputModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  // private _bottomSheetRef =inject<MatBottomSheetRef<CreateTaskComponent>>(MatBottomSheetRef);
    private bottomSheetRef = inject(MatBottomSheetRef<CreateTaskComponent>);
    private tasksService=inject(TasksService)
  newTaskInputValue!:string
  campaignTwo:any;
 constructor(private fb:FormBuilder){}
 CreateTaskFrom=this.fb.group({
  title:[''],
  Priority:['Hight'],
  done:[false],
  progress:[0],
  date:[null as Date | null],
 })
createTaks(){
  const itemTask=this.CreateTaskFrom.getRawValue();
  this.tasksService.createTask(itemTask)
}
 onsubmit(){
  if(this.CreateTaskFrom.invalid){
    this.CreateTaskFrom.markAllAsTouched()
    return;
  }
  if(this.CreateTaskFrom){
  this.createTaks();
    this.bottomSheetRef.dismiss(this.CreateTaskFrom.value);
    
    console.log(this.CreateTaskFrom.value)
  }
 }
}
